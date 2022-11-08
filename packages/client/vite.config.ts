import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  preview: {
    port: Number(process.env.PORT) || Number(process.env.CLIENT_PORT) || 3000,
  },
  plugins: [react()],
});
