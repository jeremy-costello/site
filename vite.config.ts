import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cesium from 'vite-plugin-cesium';

// https://vite.dev/config/
export default defineConfig({
  base: "/site",
  plugins: [
    react(),
    cesium()
  ],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  }
})
