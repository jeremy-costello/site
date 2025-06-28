// components/layout/TopBar.tsx
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';

const TopBar = ({
  onMenuClick,
  toggleTheme,
}: {
  onMenuClick: () => void;
  toggleTheme: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const title = isMobile ? 'Jeremy' : "Jeremy's Personal Website";

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        height: isMobile ? '56px' : '64px',
        boxShadow: theme.palette.mode === 'dark' ? theme.shadows[8] : theme.shadows[4],
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Centered clickable title using Link */}
        <Box
          component={Link}
          to="/"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Box>

        <IconButton color="inherit" onClick={toggleTheme} size="large">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
