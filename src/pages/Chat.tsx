import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Link, LinearProgress, CircularProgress } from '@mui/material';
import ChatContainer from '../components/chat/ChatContainer';
import ArticlesSidebar from '../components/chat/ArticlesSidebar';
import PageHeader from '../components/layout/PageHeader';
import { initLLM, CHAT_MODEL_REPO, CHAT_MODEL_FILE } from '../services/llm';
import { initEmbedder, EMBED_MODEL_REPO, EMBED_MODEL_FILE } from '../services/embed';
import { ModelManager } from '@wllama/wllama';
import { initDB } from '../services/db';

interface RetrievedArticle {
  title: string;
  text: string;
}

interface Progress {
  loaded: number;
  total: number;
}

const Chat = () => {
  const [cachedArticles, setCachedArticles] = useState<RetrievedArticle[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingLocal, setCheckingLocal] = useState(true);
  const [llmProgress, setLLMProgress] = useState<number | null>(null);
  const [embedderProgress, setEmbedderProgress] = useState<number | null>(null);

  const chatModelResolveUrl = `https://huggingface.co/${CHAT_MODEL_REPO}/resolve/main/${CHAT_MODEL_FILE}`;
  const chatModelBlobUrl = `https://huggingface.co/${CHAT_MODEL_REPO}/blob/main/${CHAT_MODEL_FILE}`;
  const embeddingModelResolveUrl = `https://huggingface.co/${EMBED_MODEL_REPO}/resolve/main/${EMBED_MODEL_FILE}`;
  const embeddingModelBlobUrl = `https://huggingface.co/${EMBED_MODEL_REPO}/blob/main/${EMBED_MODEL_FILE}`;

  const handleArticlesChange = (articles: RetrievedArticle[]) => {
    setCachedArticles(articles);
  };

  useEffect(() => {
    const checkModels = async () => {
      try {
        const manager = new ModelManager({ allowOffline: true });
        const models = await manager.getModels();
        const urls = models.map(m => m.url);

        const hasChatModel = urls.includes(chatModelResolveUrl);
        const hasEmbedModel = urls.includes(embeddingModelResolveUrl);

        if (hasChatModel && hasEmbedModel) {
          await initDB();
          await initLLM();
          await initEmbedder();
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Error checking local model cache:', err);
      } finally {
        setCheckingLocal(false);
      }
    };

    checkModels();
  }, []);

  const handleInit = async () => {
    setIsLoading(true);
    try {
      await initDB();
      await initLLM(({ loaded, total }: Progress) => {
        const percent = Math.round((loaded / total) * 100);
        setLLMProgress(percent);
      });

      await initEmbedder(({ loaded, total }: Progress) => {
        const percent = Math.round((loaded / total) * 100);
        setEmbedderProgress(percent);
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Model initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingLocal) {
    return (
      <PageHeader title="Checking Local Models">
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Checking if required models are already downloaded...
          </Typography>
          <CircularProgress />
        </Box>
      </PageHeader>
    );
  }

  if (!isInitialized) {
    return (
      <PageHeader title="RAG Chat Initialization Required">
        <Box sx={{ p: 4, maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            ⚠️ Model Download Required
          </Typography>
          <Typography variant="body1" paragraph>
            This page requires downloading two models from Hugging Face.
            <br />
            Depending on your connection, this may take several minutes.
          </Typography>
          <Typography variant="body2">Required models:</Typography>
          <ul style={{ textAlign: 'center', marginTop: 8 }}>
            <li>
              <Link href={chatModelBlobUrl} target="_blank" rel="noopener">
                {CHAT_MODEL_FILE}
              </Link>
            </li>
            <li>
              <Link href={embeddingModelBlobUrl} target="_blank" rel="noopener">
                {EMBED_MODEL_FILE}
              </Link>
            </li>
          </ul>

          <Box sx={{ mt: 4 }}>
            {!isLoading ? (
              <Button variant="contained" color="primary" onClick={handleInit}>
                Download & Initialize Models
              </Button>
            ) : (
              <>
                <Typography variant="body2" gutterBottom>
                  Downloading Chat Model... {llmProgress ?? 0}%
                </Typography>
                <LinearProgress variant="determinate" value={llmProgress ?? 0} sx={{ mb: 2 }} />
                <Typography variant="body2" gutterBottom>
                  Downloading Embedding Model... {embedderProgress ?? 0}%
                </Typography>
                <LinearProgress variant="determinate" value={embedderProgress ?? 0} />
              </>
            )}
          </Box>
        </Box>
      </PageHeader>
    );
  }

  return (
    <PageHeader title="RAG Chat">
      <Grid container spacing={0}>
        <Grid
          size={{
            xs: 12,
            md: 8
          }}
          sx={{ height: 'calc(100vh - 184px)', display: 'flex', flexDirection: 'column' }}
        >
          <ChatContainer
            onArticlesChange={handleArticlesChange}
            cachedArticles={cachedArticles}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
          sx={{ height: 'calc(100vh - 184px)', display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}
        >
          <ArticlesSidebar articles={cachedArticles} />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Chat;
