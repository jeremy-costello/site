// components/categories/CategoryDisplay.tsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Chip,
  Button,
  Card,
  CardContent
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import type { Article } from "../../types";
import { useTheme } from "@mui/material/styles";

interface Props {
  selectedCategory: string;
  articles: Article[];
  loading: boolean;
}

const CategoryDisplay: React.FC<Props> = ({ selectedCategory, articles, loading }) => {
  const theme = useTheme();
  
  if (!selectedCategory) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <CategoryIcon color="disabled" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Select a Category
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Choose a category to view some sample articles
        </Typography>
      </Paper>
    );
  }

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading articles...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      <Box borderColor="divider" sx={{ p: 3, borderBottom: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            Articles in "{selectedCategory}"
          </Typography>
          <Chip
            label={articles.length}
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      
      {articles.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <ArticleIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            No articles found in this category.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            maxHeight: 'calc(100vh - 282px)',
            overflowY: 'auto',

              // scrollbar
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.text.primary,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          }}>
          {articles.map((article, index) => (
            <React.Fragment key={article.id}>
              <Card
                variant="outlined" 
                sx={{ 
                  m: 2,
                  boxShadow: "none",
                  border: 1,
                  borderColor: theme.palette.divider
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                  >
                    {article.title}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={`ID: ${article.id}`} 
                      size="small" 
                      variant="outlined"
                      color="default"
                    />
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    color="text.primary"
                    sx={{ 
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {article.text.length > 500 
                      ? `${article.text.substring(0, 500)}...` 
                      : article.text
                    }
                  </Typography>
                  
                  {article.text.length > 500 && (
                    <Button 
                      size="small" 
                      sx={{ mt: 1, p: 0, minWidth: "auto" }}
                      endIcon="→"
                    >
                      Read more
                    </Button>
                  )}
                </CardContent>
              </Card>
              {index < articles.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default CategoryDisplay;