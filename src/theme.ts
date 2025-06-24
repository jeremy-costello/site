// theme.ts
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    topbar: Palette['primary'];
  }
  interface PaletteOptions {
    topbar?: PaletteOptions['primary'];
  }
}

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      topbar: {
        main: mode === 'light' ? '#f9f9f9' : '#1f1f1f',
        contrastText: mode === 'light' ? '#333' : '#fff',
      },
    },
  });
