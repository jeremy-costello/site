import { Box, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { backgroundImages } from '../data/BackgroundImages';
import { useTheme } from '@mui/material/styles';

interface BackgroundProps {
  setSelectedBackground: (filename: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
}

const Background = ({ setSelectedBackground, setBackgroundOpacity }: BackgroundProps) => {
  const theme = useTheme();

  const [opacity, setOpacity] = useState<number>(0.5);

  useEffect(() => {
    setBackgroundOpacity(opacity);
  }, [opacity]);

  return (
    <>
      {/* Vertical thumbnails on right */}
      <Box
        sx={{
          position: 'fixed',
          top: 160,
          right: 0,
          width: 100,
          bottom: 192,
          overflowY: 'auto',
          backgroundColor: theme.palette.primary.contrastText,
          backdropFilter: 'blur(4px)',
          px: 1,
          pt: 2,
          borderRadius: 1,

          // scrollbar
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.text.primary,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {backgroundImages.map((img) => (
          <Box
            key={img}
            component="img"
            src={`/backgrounds/${img}`}
            alt={img}
            onClick={() => setSelectedBackground(img)}
            sx={{
              width: '100%',
              height: 60,
              objectFit: 'cover',
              borderRadius: 1,
              mb: 2,
              cursor: 'pointer',
              '&:hover': {
                border: `4px solid ${theme.palette.text.primary}`,
              },
            }}
          />
        ))}
      </Box>

      {/* Horizontal slider on bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 96,
          backgroundColor: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box width={300}>
          <Typography variant="caption" color="text.primary">
            Background Opacity
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(_, newValue) => setOpacity(newValue as number)}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default Background;
