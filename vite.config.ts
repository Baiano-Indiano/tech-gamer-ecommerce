import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente
  loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@app': resolve(__dirname, './src/app'),
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
        '@features': resolve(__dirname, './src/features'),
        '@lib': resolve(__dirname, './src/lib'),
        '@services': resolve(__dirname, './src/services'),
        '@stores': resolve(__dirname, './src/stores'),
        '@types': resolve(__dirname, './src/types')
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173
      },
      watch: {
        usePolling: true
      }
    },
    preview: {
      port: 5173,
      strictPort: true
    }
  };
});
