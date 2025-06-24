// components/chat/RAGChat.tsx
import { useState } from 'react';
import { Grid } from '@mui/material';
import ChatContainer from './ChatContainer';
import ArticlesSidebar from './ArticlesSidebar';

interface RetrievedArticle {
  title: string;
  text: string;
}

export default function RAGChat() {
  const [cachedArticles, setCachedArticles] = useState<RetrievedArticle[]>([]);

  const handleArticlesChange = (articles: RetrievedArticle[]) => {
    setCachedArticles(articles);
  };

  return (
    <Grid container spacing={0} sx={{ height: 600 }}>
      {/* Chat Area */}
      <Grid
        size={{
          xs: 8
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
          xs: 4
        }}
      >
        <ArticlesSidebar articles={cachedArticles} />
      </Grid>
    </Grid>
  );
}