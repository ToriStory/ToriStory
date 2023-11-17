import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    sentryVitePlugin({
      org: '3f56768989e9',
      project: 'javascript-react',
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      stores: '/src/stores',
      assets: '/src/assets',
      constants: '/src/constants',
      types: '/src/types',
      utils: '/src/utils',
      apis: '/src/apis',
      atoms: '/src/components/atoms',
      molecules: '/src/components/molecules',
      organisms: '/src/components/organisms',
      templates: '/src/components/templates',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        sw: './sw.js',
      },
    },

    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://tori-story.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
