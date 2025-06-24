// components/chat/ChatHeader.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  type SelectChangeEvent
} from '@mui/material';
import { Clear, Circle } from '@mui/icons-material';

interface ChatHeaderProps {
  messageCount: number;
  cachedArticlesCount: number;
  onClearChat: () => void;
  numArticles: number | 'none';
  onNumArticlesChange: (value: number | 'none') => void;
  paragraphsPerArticle: number | 'all';
  onParagraphsPerArticleChange: (value: number | 'all') => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  messageCount,
  cachedArticlesCount,
  onClearChat,
  numArticles,
  onNumArticlesChange,
  paragraphsPerArticle,
  onParagraphsPerArticleChange
}) => {
  const theme = useTheme();

  const handleNumArticlesChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onNumArticlesChange(value === 'none' ? 'none' : parseInt(value));
  };

  const handleParagraphsChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onParagraphsPerArticleChange(value === 'all' ? 'all' : parseInt(value));
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      borderBottom: 1,
      borderColor: 'divider',
      bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Circle sx={{
          color: 'success.main',
          fontSize: 12
        }} />
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          RAG Assistant
        </Typography>
        {cachedArticlesCount > 0 && numArticles !== 'none' && (
          <Chip
            label={`${cachedArticlesCount} article${cachedArticlesCount > 1 ? 's' : ''} loaded`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.75rem',
              height: 24
            }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Number of Articles Selector */}
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="num-articles-label" sx={{ fontSize: '0.75rem' }}>
            Articles
          </InputLabel>
          <Select
            labelId="num-articles-label"
            value={numArticles.toString()}
            label="Articles"
            onChange={handleNumArticlesChange}
            sx={{ 
              fontSize: '0.75rem',
              height: 32,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider'
              }
            }}
          >
            <MenuItem value="none" sx={{ fontSize: '0.75rem' }}>
              None
            </MenuItem>
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num.toString()} sx={{ fontSize: '0.75rem' }}>
                {num} article{num !== 1 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Paragraphs Selector */}
        <FormControl 
          size="small" 
          sx={{ minWidth: 110 }}
          disabled={numArticles === 'none'}
        >
          <InputLabel id="paragraphs-label" sx={{ fontSize: '0.75rem' }}>
            Paragraphs
          </InputLabel>
          <Select
            labelId="paragraphs-label"
            value={paragraphsPerArticle.toString()}
            label="Paragraphs"
            onChange={handleParagraphsChange}
            sx={{ 
              fontSize: '0.75rem',
              height: 32,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider'
              }
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num.toString()} sx={{ fontSize: '0.75rem' }}>
                {num} paragraph{num !== 1 ? 's' : ''}
              </MenuItem>
            ))}
            <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>
              All paragraphs
            </MenuItem>
          </Select>
        </FormControl>

        {messageCount > 0 && (
          <Button
            onClick={onClearChat}
            startIcon={<Clear />}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                bgcolor: 'action.hover'
              }
            }}
          >
            Clear Chat
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ChatHeader;