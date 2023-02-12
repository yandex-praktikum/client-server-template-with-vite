import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import path from 'path';

dotenv.config();
// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    __API_SERVER_HOST__: `'${process.env.SERVER_HOST}'`,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    VitePWA({ injectRegister: 'auto' }),
    viteStaticCopy({
      targets: [
        {
          src: './src/sw/sw.js',
          dest: '/',
        },
      ],
    }),
  ],
});
