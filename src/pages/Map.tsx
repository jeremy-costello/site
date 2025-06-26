// pages/Map.tsx
import { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import MapWidget from '../components/map/MapWidget';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';

const Map = () => {
  const [is3D, setIs3D] = useState(true);

  const toggle2D3D = () => {
    setIs3D(!is3D);
  };

  return (
    <>
      <MapWidget is3D={is3D} />
      <Tooltip title={`Switch to ${is3D ? '2D' : '3D'}`}>
        <Button
          onClick={toggle2D3D}
          variant="contained"
          color="inherit"
          startIcon={is3D
            ? <MapIcon fontSize="large" color="primary" />
            : <LanguageIcon fontSize="large" color="primary" />
          }
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            textTransform: 'none',
          }}
        >
          Switch to {is3D ? '2D' : '3D'}
        </Button>
      </Tooltip>
    </>
  );
};

export default Map;