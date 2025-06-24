// components/chat/ChatMessage.tsx
import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar,
  useTheme 
} from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.type === 'user';

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      mb: 2
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start',
        gap: 1,
        maxWidth: '80%',
        flexDirection: isUser ? 'row-reverse' : 'row'
      }}>
        {/* Avatar */}
        <Avatar sx={{ 
          width: 32, 
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'primary.contrastText' : 'text.primary'
        }}>
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Avatar>
        
        {/* Message Bubble */}
        <Paper
          elevation={1}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: isUser ? 'primary.main' : (theme.palette.mode === 'light' ? 'background.paper' : 'grey.800'),
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
            borderBottomLeftRadius: isUser ? 2 : 0.5,
            borderBottomRightRadius: isUser ? 0.5 : 2,
            border: isUser ? 'none' : 1,
            borderColor: 'divider'
          }}
        >
          <Typography 
            variant="body2" 
            component="div"
            sx={{ 
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {message.content}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              mt: 0.5,
              opacity: 0.7,
              color: isUser ? 'primary.contrastText' : 'text.secondary'
            }}
          >
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatMessage;