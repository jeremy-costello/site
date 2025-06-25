import { Box, Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
