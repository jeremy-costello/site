// components/layout/PageHeader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionLayoutProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<SectionLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box mb={2}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box flex={1} overflow="hidden">
        {children}
      </Box>
    </Box>
  );
};


export default PageHeader;
