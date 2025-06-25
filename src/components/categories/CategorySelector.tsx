// components/categories/CategorySelector.tsx
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  useTheme
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({ categories, selectedCategory, onSelect }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          Categories
        </Typography>
        <Chip 
          label={categories.length} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>
      
      {categories.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <FolderIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No categories found. Upload some articles first!
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {categories.map((cat) => (
            <ListItem key={cat} disablePadding>
              <ListItemButton
                onClick={() => onSelect(cat)}
                selected={selectedCategory === cat}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.contrastText + '20',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '30',
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={cat}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: selectedCategory === cat ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CategorySelector;