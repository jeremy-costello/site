import { Box, Slider, Typography } from '@mui/material';
import { backgroundImages } from '../data/BackgroundImages';
import { useTheme } from '@mui/material/styles';
import { BASE_PATH } from '../services/utils';

interface BackgroundProps {
  setSelectedBackground: (filename: string) => void;
  backgroundOpacity: number;
  setBackgroundOpacity: (opacity: number) => void;
}

const Background = ({
  setSelectedBackground,
  backgroundOpacity,
  setBackgroundOpacity
}: BackgroundProps) => {
  const theme = useTheme();

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
            src={`${BASE_PATH}/backgrounds/thumbs/${img}`}
            alt={img}
            onClick={() => {
              setSelectedBackground(img);
              localStorage.setItem("backgroundImage", img);
            }}
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
            value={backgroundOpacity}
            onChange={(_, newValue) => {
              setBackgroundOpacity(newValue);
              localStorage.setItem("backgroundOpacity", newValue.toString());
            }}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default Background;
