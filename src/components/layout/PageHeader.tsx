import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface SectionLayoutProps {
  height?: string; // e.g., 'calc(100vh - 112px)'
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<SectionLayoutProps> = ({ height = '100%', title, children }) => {
  return (
    <Box sx={{ height, overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default PageHeader;
