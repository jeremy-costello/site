// pages/Poetry.tsx
import { Paper } from '@mui/material';
import Writing from '../components/writing/Writing';
import PageHeader from '../components/layout/PageHeader';
import { poetry } from '../data/writing/Poetry';

const Poetry = () => {
  return (
    <PageHeader title="Poetry">
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 2
        }}
      >
        <Writing writingsBySection={poetry} />
      </Paper>
    </PageHeader>
  );
};

export default Poetry;