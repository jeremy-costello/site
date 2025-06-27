import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { previews } from '../data/HomePreviews';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Jeremy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          My personal website.
        </Typography>
      </Box>

      {/* Bio */}
      <Box textAlign="center" mb={6}>
        <Typography variant="body1" maxWidth="sm" mx="auto">
          Hello! My name is Jeremy. I am something.
        </Typography>
      </Box>

      {/* Grid Previews */}
      <Grid container spacing={4}>
        {previews.map((item, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
          >
            <Box height="100%" display="flex">
              <Link
                to={item.path || "/"}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  {item.image && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.image}
                      alt={item.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
