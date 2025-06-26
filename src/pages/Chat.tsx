// pages/Chat.tsx
import { useState } from 'react';
import { Grid } from '@mui/material';
import ChatContainer from '../components/chat/ChatContainer';
import ArticlesSidebar from '../components/chat/ArticlesSidebar';
import PageHeader from '../components/layout/PageHeader';

interface RetrievedArticle {
  title: string;
  text: string;
}

const Chat = () => {
  const [cachedArticles, setCachedArticles] = useState<RetrievedArticle[]>([]);

  const handleArticlesChange = (articles: RetrievedArticle[]) => {
    setCachedArticles(articles);
  };

  return (
    <PageHeader title="RAG Chat">
      <Grid container spacing={0}>
        {/* Chat Area */}
        <Grid
          size={{
            xs: 12,
            md: 8
          }}
          sx={{
            height: 'calc(100vh - 184px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <ChatContainer
            onArticlesChange={handleArticlesChange}
            cachedArticles={cachedArticles}
          />
        </Grid>

        {/* Articles Sidebar */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
          sx={{
            height: 'calc(100vh - 184px)',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column'
          }}
        >
          <ArticlesSidebar articles={cachedArticles} />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Chat;