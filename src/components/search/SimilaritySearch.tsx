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
  Stack,
  Divider
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchSimilarArticles } from '../../services/db';
import type { Article } from '../../types';
import { useTheme } from "@mui/material/styles";

const SimilaritySearch = () => {
  const theme = useTheme();

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
    <>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            slotProps={{
              input: {
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
              }
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
          <Box
            sx={{
              maxHeight: 'calc(100vh - 392px)',
              overflowY: 'auto',
              p: 1,

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
            }}
          >
            {results.map((result, index) => (
              <Box key={result.id}>
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
                      {result.title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={`ID: ${result.id}`}
                        size="small"
                        variant="outlined"
                        color="default"
                      />
                      {result.category && (
                        <Chip
                          label={result.category}
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      )}
                      {typeof result.similarity === 'number' && (
                        <Chip
                          label={`Score: ${result.similarity.toFixed(4)}`}
                          size="small"
                          color="primary"
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {result.text.length > 500
                        ? `${result.text.substring(0, 500)}...`
                        : result.text}
                    </Typography>

                    {result.text.length > 500 && (
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
                {index < results.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SimilaritySearch;
