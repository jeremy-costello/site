// components/chat/ChatInput.tsx
import React from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxLength = 500;

  return (
    <Box sx={{ 
      borderTop: 1, 
      borderColor: 'divider',
      bgcolor: 'background.paper',
      p: { xs: 1, sm: 2 },
      flexShrink: 0
    }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          multiline
          rows={isMobile ? 1 : 2}
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
            minWidth: { xs: 'auto', sm: 120 },
            height: 'fit-content',
            alignSelf: { xs: 'stretch', sm: 'flex-end' },
            mb: { xs: 0, sm: '8px' }
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 0.5, sm: 0 }
      }}>
        <Typography variant="caption" color="text.secondary">
          {query.length}/{maxLength} characters
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {isMobile ? 'Enter to send' : 'Shift+Enter for new line'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatInput;