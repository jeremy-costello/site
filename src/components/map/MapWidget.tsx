import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import {
  Viewer
} from "@cesium/widgets";
import {
  Ion,
  SceneMode
} from "@cesium/engine";
import { getCesiumViewer } from '../../services/map';

interface MapSectionProps {
  is3D: boolean;
}

const MapWidget: React.FC<MapSectionProps> = ({ is3D }) => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const viewerInitialized = useRef(false);

  useEffect(() => {
    const initializeViewer = async () => {
      if (cesiumContainerRef.current === null) return;

      try {
        if (!viewerInitialized.current && !viewerRef.current) {
          viewerInitialized.current = true;

          Ion.defaultAccessToken = Ion.defaultAccessToken;

          viewerRef.current = await getCesiumViewer(cesiumContainerRef.current);
        }
      } catch (error) {
        console.error('Error initializing Cesium:', error);
      }
    };

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
        viewerInitialized.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      const sceneMode = is3D ? SceneMode.SCENE3D : SceneMode.SCENE2D;
      viewerRef.current.scene.mode = sceneMode;
    }
  }, [is3D]);

  return (
    <Box width="100%" height="100%">
      <Box
        ref={cesiumContainerRef}
        sx={{
          position: "fixed",
          width: '100%',
          height: 'calc(100vh - 64px)',
          left: 0,
          top: 64
        }}
      />
    </Box>
  );
};

export default MapWidget;
