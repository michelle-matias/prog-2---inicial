import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hub: resolve(__dirname, 'hub.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        balcao_unico: resolve(__dirname, 'balcao-unico.html'),
        diretorio: resolve(__dirname, 'diretorio.html'),
        prova_vida: resolve(__dirname, 'prova-vida.html'),
        refeitorio: resolve(__dirname, 'refeitorio.html'),
      }
    }
  }
});
