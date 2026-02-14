import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    watch: {
      usePolling: false, // set to true if using WSL or Docker and HMR is unreliable
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'clsx',
      'lucide-react',
      'react-router-dom',
      'react-icons',
      'react-syntax-highlighter',
      'react-use-measure',
      'tailwind-merge',
      'vaul',
      '@tabler/icons-react',
      'lenis',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
