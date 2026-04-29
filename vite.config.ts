import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@components(.*)$/, replacement: path.resolve(__dirname, 'src/components') + '$1' },
      { find: /^@pages(.*)$/, replacement: path.resolve(__dirname, 'src/pages') + '$1' },
      { find: /^@layouts(.*)$/, replacement: path.resolve(__dirname, 'src/layouts') + '$1' },
      { find: /^@services(.*)$/, replacement: path.resolve(__dirname, 'src/services') + '$1' },
      { find: /^@hooks(.*)$/, replacement: path.resolve(__dirname, 'src/hooks') + '$1' },
      { find: /^@routes(.*)$/, replacement: path.resolve(__dirname, 'src/routes') + '$1' },
      { find: /^@models(.*)$/, replacement: path.resolve(__dirname, 'src/models') + '$1' },
      { find: /^@context(.*)$/, replacement: path.resolve(__dirname, 'src/context') + '$1' },
      { find: /^@config(.*)$/, replacement: path.resolve(__dirname, 'src/config') + '$1' },
      { find: /^@utils(.*)$/, replacement: path.resolve(__dirname, 'src/utils') + '$1' },
      { find: /^@assets(.*)$/, replacement: path.resolve(__dirname, 'src/assets') + '$1' },
      { find: /^@theme(.*)$/, replacement: path.resolve(__dirname, 'src/theme') + '$1' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
