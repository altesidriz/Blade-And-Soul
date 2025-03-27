import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
// NEED TO DELETE THIS AT DEPLOY
    server: {
      proxy: {
        '/api': 'http://localhost:8800'
      }
    },
// NEED TO DELETE THIS AT DEPLOY

});