import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    // Drop 'console' and 'debugger' statements
    // drop: ['console', 'debugger'],
  },
  css: {
    // Enable CSS sourcemaps for easier debugging
    devSourcemap: true,
  },
  plugins: [
    react(),
    // Sync alias settings with tsconfig.json paths
    tsconfigPaths(),
    createSvgIconsPlugin({
      // Specify the icon folder to cache
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Define the format for the symbolId
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    // Automatically open the browser
    open: true,
    host: true,
    port: 3001, // Running your Vite dev server on port 3001
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to backend server on port 5000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove 'console' and 'debugger' statements in production
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
