// pages/Chat.tsx
import { 
  Container, 
  Typography, 
  Paper, 
  Box
} from '@mui/material';
import RAGChat from '../components/chat/RAGChat';

const Chat = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: 'text.primary',
          mb: 2 
        }}>
          RAG Chat
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ask questions about your articles using Retrieval-Augmented Generation (RAG). 
          The system will find relevant articles and use them to provide informed answers.
          Use the dropdown to select how many articles to retrieve, and view them in the sidebar.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <RAGChat />
      </Paper>
    </Container>
  );
};

export default Chat;