// components/chat/ArticlesSidebar.tsx
import { 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { Article as ArticleIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

interface RetrievedArticle {
  title: string;
  text: string;
}

interface ArticlesSidebarProps {
  articles: RetrievedArticle[];
}

export default function ArticlesSidebar({ articles }: ArticlesSidebarProps) {
  const theme = useTheme();
  
  const countParagraphs = (text: string): number => {
    return text.split('\n\n').filter(p => p.trim()).length;
  };
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        height: '100%',
        bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default',
        border: 1,
        borderColor: 'divider',
        borderRadius: '0 4px 4px 0',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ArticleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Retrieved Articles
          </Typography>
        </Box>
        <Chip 
          label={`${articles.length} article${articles.length !== 1 ? 's' : ''}`}
          size="small"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 500
          }}
        />
      </Box>

      {/* Articles List */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        p: 1
      }}>
        {articles.length === 0 ? (
          <Box sx={{ 
            p: 3, 
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            <ArticleIcon sx={{ 
              fontSize: 48, 
              color: theme.palette.mode === 'light' ? 'grey.300' : 'grey.600', 
              mb: 2 
            }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              No articles retrieved yet
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Ask your first question to see relevant articles appear here
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {articles.map((article, index) => (
              <Card 
                key={index}
                variant="outlined"
                sx={{ 
                  bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default',
                  '&:hover': {
                    boxShadow: theme.palette.mode === 'light' ? 2 : 4,
                    borderColor: 'primary.main'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.main',
                        lineHeight: 1.3,
                        flex: 1
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Chip
                      icon={<VisibilityIcon />}
                      label={`${countParagraphs(article.text)}¶`}
                      size="small"
                      sx={{ 
                        ml: 1,
                        bgcolor: 'info.main',
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.text}
                  </Typography>
                  {article.text.length > 200 && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'primary.main',
                        fontStyle: 'italic',
                        mt: 1,
                        display: 'block'
                      }}
                    >
                      Click to expand...
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}