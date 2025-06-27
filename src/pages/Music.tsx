import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  CardHeader
} from '@mui/material';
import { musicFiles } from '../data/MusicFiles';
import PageHeader from '../components/layout/PageHeader';
import { BASE_PATH } from '../services/utils';

const Music: React.FC = () => {
  return (
    <PageHeader title="Music">
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
                  <source src={`${BASE_PATH}/music/${fileName}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageHeader>
  );
};

export default Music;
