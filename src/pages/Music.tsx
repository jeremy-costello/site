import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CardHeader
} from '@mui/material';
import { musicFiles } from '../data/MusicFiles';

const Music: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Music Gallery
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Listen to tracks from the music folder.
        </Typography>
      </Box>

      {/* Grid of Players */}
      <Grid container spacing={4}>
        {musicFiles.map((fileName, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardHeader
                title={fileName.replace('.mp3', '')}
                titleTypographyProps={{ variant: 'h6' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <audio controls style={{ width: '100%' }}>
                  <source src={`/music/${fileName}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Music;
