// components/categories/CategoryDisplay.tsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  Card,
  CardContent
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import type { Article } from "../../types";
import { useTheme } from "@mui/material/styles";

interface Props {
  selectedCategory: string;
  articles: Article[];
}

const CategoryDisplay: React.FC<Props> = ({ selectedCategory, articles }) => {
  const theme = useTheme();
  
  if (!selectedCategory) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <CategoryIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Select a Category
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose a category to view some sample articles
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Box alignItems="center" display="flex">
          <Typography variant="h5" fontWeight="bold" flexGrow="1">
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
    </Paper>
  );
};

export default CategoryDisplay;