// layout/Sidebar.tsx
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Link as MaterialLink
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { navItems } from '../navigation/Navigation';

const drawerWidth = 240;

const Sidebar = ({
  drawerOpen,
  onDrawerToggle,
}: {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}) => {
  const location = useLocation();
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box mb={2}>
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          Site Pages
        </Typography>
        <Typography variant="caption" color={theme.palette.text.secondary}>
          Navigate my site!
        </Typography>
      </Box>

      <List>
        {navItems.map(({ path, label, icon }) => (
          <ListItemButton
            key={path}
            component={RouterLink}
            to={path}
            selected={location.pathname === path}
            onClick={onDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

      <Box mt="auto" pt={2} borderTop={`1px solid ${theme.palette.divider}`}>
        <Typography variant="caption" color="text.secondary">
          Built with React + TypeScript
          <br />
          Embeddings & LLM from{' '}
          <MaterialLink
            href="https://github.com/ngxson/wllama"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wllama
          </MaterialLink>
          <br />
          Database & Search from{' '}
          <MaterialLink
            href="https://github.com/electric-sql/pglite"
            target="_blank"
            rel="noopener noreferrer"
          >
            PGlite
          </MaterialLink>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
