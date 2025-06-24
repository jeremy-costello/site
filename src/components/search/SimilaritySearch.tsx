// components/search/SimilaritySearch.tsx
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchSimilarArticles } from '../../services/db';
import type { Article } from '../../types';

const SimilaritySearch = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const articles = await searchSimilarArticles(query, 25);
      setResults(articles);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
            Search Results ({results.length})
          </Typography>
          <Stack spacing={2}>
            {results.map((result) => (
              <Card 
                key={result.id}
                elevation={2}
                sx={{ 
                  '&:hover': { 
                    elevation: 4,
                    boxShadow: (theme) => theme.shadows[4]
                  },
                  transition: 'box-shadow 0.2s ease-in-out'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h4" 
                      sx={{ fontWeight: 600, flex: 1, mr: 2 }}
                    >
                      {result.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                      <Chip 
                        label={result.category} 
                        size="small"
                        variant="outlined"
                        color="default"
                      />
                      <Chip 
                        label={`Score: ${result.similarity?.toFixed(4)}`}
                        size="small"
                        color="primary"
                        variant="filled"
                      />
                    </Stack>
                  </Box>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {result.text.length > 300 
                      ? `${result.text.substring(0, 300)}...` 
                      : result.text
                    }
                  </Typography>
                  {result.text.length > 300 && (
                    <Button 
                      variant="text" 
                      size="small"
                      sx={{ mt: 1, p: 0, textTransform: 'none' }}
                    >
                      Read full article →
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SimilaritySearch;