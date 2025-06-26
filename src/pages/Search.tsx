// pages/Search.tsx
import { Paper } from '@mui/material';
import SimilaritySearch from '../components/search/SimilaritySearch';
import PageHeader from '../components/layout/PageHeader';

const Search = () => {
  return (
    <PageHeader title="Semantic Search">
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