// pages/Categories.tsx
import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Container
} from '@mui/material';
import { getCategories, getArticlesByCategory } from '../services/db';
import CategorySelector from '../components/categories/CategorySelector';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import type { Article } from '../types';

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const results = await getArticlesByCategory(category, 10);
      setArticles(results);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Browse Categories
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a category to view all articles within that category.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            lg: 4,
            xl: 3
          }}
        >
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3,
              position: 'sticky',
              top: 24,
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto'
            }}
          >
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={handleCategorySelect}
            />
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 8,
            xl: 9
          }}
        >
          <CategoryDisplay
            selectedCategory={selectedCategory}
            articles={articles}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;