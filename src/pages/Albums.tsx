// pages/Poetry.tsx
import { Paper } from '@mui/material';
import Writing from '../components/writing/Writing';
import PageHeader from '../components/layout/PageHeader';
import { albums } from '../data/writing/Albums';

const Albums = () => {
  return (
    <PageHeader title="My Favourite Albums">
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 2
        }}
      >
        <Writing writingsBySection={albums} />
      </Paper>
    </PageHeader>
  );
};

export default Albums;