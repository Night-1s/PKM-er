import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/PKM-er/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      ignored: ['**/.pnpm-store/**', '**/node_modules/**'],
    },
  },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index-[hash].v21.js',
        chunkFileNames: 'assets/[name]-[hash].v21.js',
        assetFileNames: 'assets/[name]-[hash].v21.[ext]',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
})
