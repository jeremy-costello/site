// components/chat/ChatInput.tsx
import React from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  CircularProgress
} from '@mui/material';
import { Send } from '@mui/icons-material';

interface ChatInputProps {
  query: string;
  loading: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  query,
  loading,
  onQueryChange,
  onSubmit,
  onKeyPress
}) => {
  const maxLength = 500;

  return (
    <Box sx={{ 
      borderTop: 1, 
      borderColor: 'divider',
      bgcolor: 'background.paper',
      p: 2
    }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={loading}
          inputProps={{
            maxLength: maxLength,
            name: 'rag-input-area'
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderWidth: 2,
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading || !query.trim()}
          startIcon={loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <Send fontSize="small" />
          )}
          sx={{ 
            minWidth: 120,
            height: 'fit-content',
            alignSelf: 'flex-end',
            mb: '8px' // Align with bottom of textarea
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Typography variant="caption" color="text.secondary">
          {query.length}/{maxLength} characters
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Shift+Enter for new line
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatInput;