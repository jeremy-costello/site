// services/llm.ts
// @ts-ignore
import { Wllama } from "../wllama/wllama-module.mjs";
import { searchSimilarArticles } from './db';
import { modelDownloadCallback, getWllamaConfigPath } from './utils';
import { exitEmbedder } from './embed';

const CHAT_MODEL_REPO = 'unsloth/Qwen3-0.6B-GGUF';
const CHAT_MODEL_FILE = 'Qwen3-0.6B-Q8_0.gguf';

const DISABLE_THINKING = true;

let llm: Wllama | null = null;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface RetrievedArticle {
  title: string;
  text: string;
}

async function initLLM(): Promise<void> {
  if (llm) return;
  const configPaths = await getWllamaConfigPath('firefox');

  llm = new Wllama(
    configPaths,
    {
      allowOffline: true
    }
  );
  await llm.loadModelFromHF(
    CHAT_MODEL_REPO,
    CHAT_MODEL_FILE,
    {
      progressCallback: modelDownloadCallback,
      n_ctx: 8192,
      useCache: true,
      n_gpu_layers: 0,
      n_batch: 2048,
      n_ubatch: 512,
      offload_kqv: false,
      use_mmap: true,
      use_mlock: true,
      flash_attn: true,
      cache_type_k: 'q8_0',
      cache_type_v: 'q8_0'
    }
  );
}

async function formatChatPrompt(messages: ChatMessage[], disable_thinking: boolean): Promise<string> {
  let formatted = messages.map(({ role, content }) => {
    const tag = role === 'system' ? 'system' : role === 'user' ? 'user' : 'assistant';
    return `<|im_start|>${tag}\n${content}<|im_end|>`;
  }).join('\n') + `\n<|im_start|>assistant\n`;

  if (disable_thinking) formatted = formatted + '<think\n\n</think>\n';

  return formatted;
}

function truncateArticleText(text: string, paragraphs: number | 'all'): string {
  if (paragraphs === 'all') return text;
  
  const paragraphArray = text.split('\n\n').filter(p => p.trim());
  return paragraphArray.slice(0, paragraphs).join('\n\n');
}

// Async generator for streaming output with chat history and cached articles
export async function* generateRAGResponse(
  userQuery: string,
  numArticles: number | 'none',
  paragraphsPerArticle: number | 'all',
  chatHistory: Array<{question: string, answer: string}> = [],
  isFirstMessage: boolean = false,
  cachedArticles: RetrievedArticle[] = []
): AsyncGenerator<string | {articles: RetrievedArticle[]}> {
  let articles: RetrievedArticle[] = [];

  // Only perform similarity search if articles are requested and it's the first message
  if (numArticles !== 'none' && isFirstMessage) {
    const searchResults = await searchSimilarArticles(userQuery, numArticles);
    await exitEmbedder();
    articles = searchResults.map(a => ({ 
      title: a.title, 
      text: truncateArticleText(a.text, paragraphsPerArticle)
    }));
    
    // Yield the retrieved articles so they can be cached
    yield { articles };
  } else if (numArticles !== 'none') {
    // Use cached articles for subsequent messages, but re-truncate if needed
    articles = cachedArticles.map(a => ({
      title: a.title,
      text: truncateArticleText(a.text, paragraphsPerArticle)
    }));
  }

  // Build messages array with chat history
  const messages: ChatMessage[] = [];

  // Add system message based on whether articles are being used
  if (numArticles === 'none') {
    messages.push({
      role: 'system',
      content: 'You are a helpful assistant. Please be as concise as possible.'
    });
  } else {
    const contexts = articles.map((a, i) => `Document ${i + 1}:\nTitle: ${a.title}\n${a.text}`);
    const contextString = contexts.join('\n\n');
    
    messages.push({
      role: 'system',
      content: `You are an assistant designed to answer user questions based on the provided documents. Please be as concise as possible.\n${contextString}`
    });
  }

  // Add chat history to context
  chatHistory.forEach(chat => {
    messages.push({ role: 'user', content: chat.question });
    messages.push({ role: 'assistant', content: chat.answer });
  });

  // Add current user query
  messages.push({ role: 'user', content: userQuery });

  const prompt = await formatChatPrompt(messages, DISABLE_THINKING);
  console.log(prompt);

  let previousText = '';

  await initLLM();
  const stream = await llm!.createCompletion(prompt, {
    nPredict: 512,
    sampling: {
      temp: 0.7,
      top_p: 0.8,
      top_k: 20,
      min_p: 0.01
    },
    stream: true,
    useCache: true
  });

  for await (const chunk of stream) {
    const newContent = chunk.currentText.slice(previousText.length) ?? '';
    if (newContent) yield newContent;
    previousText = chunk.currentText;
  }
}