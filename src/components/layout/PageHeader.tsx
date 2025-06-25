import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionLayoutProps {
  height: string;
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<SectionLayoutProps> = ({ height, title, children }) => {
  return (
    <Box height={height} overflow="hidden">
      <Typography mb={4} variant="h3" fontWeight="bold">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default PageHeader;
