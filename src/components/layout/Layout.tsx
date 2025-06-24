// layout/Layout.tsx
import { type ReactNode, useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: ReactNode;
  toggleTheme: () => void; // NEW
}

const Layout = ({ children, toggleTheme }: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <CssBaseline />
      <TopBar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} />

      {/* Sidebar */}
      <Sidebar drawerOpen={drawerOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Translucent Background Image */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          backgroundImage: 'url(./background.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.05,
        }}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
