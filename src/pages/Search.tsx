// pages/Search.tsx
import { Box, Typography, Paper } from '@mui/material';
import SimilaritySearch from '../components/search/SimilaritySearch';

const Search = () => {
  return (
    <Box sx={{ maxWidth: '64rem', mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary',
            mb: 1
          }}
        >
          Semantic Search
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
        >
          Use AI-powered semantic search to find articles similar to your query. 
          This goes beyond keyword matching to understand the meaning and context of your search.
        </Typography>
      </Box>

      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 2
        }}
      >
        <SimilaritySearch />
      </Paper>
    </Box>
  );
};

export default Search;