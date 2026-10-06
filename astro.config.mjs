import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    server: {
      allowedHosts: ['.manus.computer']
    },
    build: {
      cssMinify: true
    }
  }
});
