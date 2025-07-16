// pages/Todo.tsx
import { Paper } from '@mui/material';
import Writing from '../components/writing/Writing';
import PageHeader from '../components/layout/PageHeader';
import { todo } from '../data/writing/Todo';

const Todo = () => {
  return (
    <PageHeader title="Poetry">
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 2
        }}
      >
        <Writing writingsBySection={todo} />
      </Paper>
    </PageHeader>
  );
};

export default Todo;