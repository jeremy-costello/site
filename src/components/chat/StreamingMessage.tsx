// components/chat/StreamingMessage.tsx
import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar,
  useTheme 
} from '@mui/material';
import { SmartToy } from '@mui/icons-material';

interface StreamingMessageProps {
  content: string;
}

const StreamingMessage: React.FC<StreamingMessageProps> = ({ content }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'flex-start',
      mb: 2
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start',
        gap: 1,
        maxWidth: '80%'
      }}>
        {/* Avatar */}
        <Avatar sx={{ 
          width: 32, 
          height: 32,
          bgcolor: 'grey.300',
          color: 'text.primary'
        }}>
          <SmartToy fontSize="small" />
        </Avatar>
        
        {/* Message Bubble */}
        <Paper
          elevation={1}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'grey.800',
            color: 'text.primary',
            borderRadius: 2,
            borderBottomLeftRadius: 0.5,
            border: 1,
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
            {content}
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-block',
                width: '2px',
                height: '1em',
                bgcolor: 'text.primary',
                ml: 0.5,
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0 }
                }
              }}
            />
          </Typography>
          {content && (
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block',
                mt: 0.5,
                color: 'text.secondary'
              }}
            >
              {new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default StreamingMessage;