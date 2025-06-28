// pages/Categories.tsx
import { useEffect, useState } from 'react';
import {
  Grid, 
  Paper
} from '@mui/material';
import { getCategories, getArticlesByCategory } from '../services/db';
import CategorySelector from '../components/categories/CategorySelector';
import CategoryDisplay from '../components/categories/CategoryDisplay';
import type { Article } from '../types';
import PageHeader from '../components/layout/PageHeader';
import { initDB } from '../services/db';

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      await initDB(); // Initialize or load the DB
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    try {
      const results = await getArticlesByCategory(category, 10);
      setArticles(results);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  return (
    <PageHeader title="Browse Categories">
      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            lg: 4,
            xl: 3
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3
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
          />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Categories;