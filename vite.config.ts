import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components/admin': path.resolve(__dirname, 'src/components/admin'),
      '@components/main': path.resolve(__dirname, 'src/components/main'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages/admin': path.resolve(__dirname, 'src/pages/admin'),
      '@pages/main': path.resolve(__dirname, 'src/pages/main'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
