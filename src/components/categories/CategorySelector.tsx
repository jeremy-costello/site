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
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({ categories, selectedCategory, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

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
          <Typography variant="body2" color="text.primary">
            No categories found. The database may still be loading!
          </Typography>
          <Typography variant="caption" color="text.secondary">
            If nothing happens in a few seconds, you may have encountered an error.
          </Typography>
        </Box>
      ) : isMobile ? (
        <FormControl fullWidth size="small">
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Select Category"
            onChange={(e) => onSelect(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
