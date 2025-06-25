// pages/Search.tsx
import { Paper } from '@mui/material';
import SimilaritySearch from '../components/search/SimilaritySearch';
import PageHeader from '../components/layout/PageHeader';

const Search = () => {
  return (
    <PageHeader height="calc(100vh- 112px)" title="Semantic Search">
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 2
        }}
      >
        <SimilaritySearch />
      </Paper>
    </PageHeader>
  );
};

export default Search;