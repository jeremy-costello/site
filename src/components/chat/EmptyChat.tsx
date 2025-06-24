// components/chat/EmptyChat.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Chat } from '@mui/icons-material';

const EmptyChat: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      textAlign: 'center'
    }}>
      <Chat sx={{ 
        fontSize: 64, 
        color: 'text.disabled',
        mb: 2 
      }} />
      <Typography variant="body1" color="text.secondary">
        Start a conversation by asking a question about your articles
      </Typography>
    </Box>
  );
};

export default EmptyChat;