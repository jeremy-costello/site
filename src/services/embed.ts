// services/embed.ts
// @ts-ignore
import { Wllama } from "@wllama/wllama";
import { modelDownloadCallback, getWllamaConfigPath } from "./utils";

export const EMBED_MODEL_REPO = 'nomic-ai/nomic-embed-text-v1.5-GGUF';
export const EMBED_MODEL_FILE = 'nomic-embed-text-v1.5.Q4_K_M.gguf'

let embedder: Wllama | null = null;

export async function initEmbedder(
  onProgress?: (progress: { loaded: number; total: number }) => void
): Promise<void> {
  if (embedder) return;

  const configPaths = await getWllamaConfigPath('original');

  embedder = new Wllama(configPaths, {
    allowOffline: true
  });

  await embedder.loadModelFromHF(
    EMBED_MODEL_REPO,
    EMBED_MODEL_FILE,
    {
      progressCallback: onProgress || modelDownloadCallback,
      embeddings: true,
      pooling_type: 'LLAMA_POOLING_TYPE_MEAN',
      n_ctx: 512,
      useCache: true,
      n_batch: 512
    }
  );
}

export async function exitEmbedder(): Promise<void> {
  embedder?.exit();
  embedder = null;
}

export async function embedText(text: string, formatType: 'query' | 'document'): Promise<number[]> {
  if (!embedder) throw new Error("Embedder not initialized");

  const formatted = `search_${formatType}: ${text}`;
  const tokenized = (await embedder.tokenize(formatted)).slice(0, 512);

  return await embedder.embeddings(tokenized);
}