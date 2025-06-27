// pages/Database.tsx
import { Paper } from '@mui/material';
import Writing from '../components/writing/Writing';
import PageHeader from '../components/layout/PageHeader';
import { database } from '../data/writing/Database';

const Database = () => {
  return (
    <PageHeader title="About the Database">
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2
        }}
      >
        <Writing writingsBySection={database} />
      </Paper>
    </PageHeader>
  );
};

export default Database;