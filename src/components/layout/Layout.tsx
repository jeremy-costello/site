import { type ReactNode, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: ReactNode;
  toggleTheme: () => void;
  backgroundImage: string | null;
  backgroundOpacity: number;
}

const Layout = ({ children, toggleTheme, backgroundImage, backgroundOpacity }: LayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <TopBar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} />
      <Sidebar drawerOpen={drawerOpen} onDrawerToggle={handleDrawerToggle} />

      {/* Background image rendered here using selected filename */}
      {backgroundImage && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            backgroundImage: `url(./backgrounds/${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: backgroundOpacity,
          }}
        />
      )}

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
