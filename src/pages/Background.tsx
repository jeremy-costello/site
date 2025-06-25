import { Box, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { backgroundImages } from '../data/BackgroundImages';
import { useTheme } from '@mui/material/styles';

interface BackgroundProps {
  onSelect: (filename: string) => void;
  onOpacityChange: (opacity: number) => void;
}

const Background = ({ onSelect, onOpacityChange }: BackgroundProps) => {
  const theme = useTheme();

  const [opacity, setOpacity] = useState<number>(0.5);

  useEffect(() => {
    onOpacityChange(opacity);
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
          bottom: 160,
          overflowY: 'auto',
          backgroundColor: theme.palette.topbar.main,
          backdropFilter: 'blur(4px)',
          zIndex: 1200,
          px: 1,
          pt: 2,

          // scrollbar
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
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
            onClick={() => onSelect(img)}
            sx={{
              width: '100%',
              height: 60,
              objectFit: 'cover',
              borderRadius: 1,
              mb: 1,
              border: '2px solid transparent',
              cursor: 'pointer',
              '&:hover': {
                border: '2px solid #fff',
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
          height: 64,
          backgroundColor: theme.palette.topbar.main,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
        }}
      >
        <Box width={300}>
          <Typography variant="caption" color="text.secondary">
            Background Opacity
          </Typography>
          <Slider
            valueLabelDisplay="auto"
            min={0}
            max={1}
            step={0.01}
            value={opacity}
            onChange={(_, newValue) => setOpacity(newValue as number)}
            sx={{ color: 'text.secondary' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Background;
