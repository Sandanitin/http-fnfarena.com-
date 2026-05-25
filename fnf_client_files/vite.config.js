import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', 
  define: {
    __CDN_BASE__: JSON.stringify("https://cdn.acsdev.in/FNF/")
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5173',
    },
  },
});
