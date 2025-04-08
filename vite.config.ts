import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactBlueberryUI',
      fileName: (format) => `react-blueberry-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: 'stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'interfaces', replacement: path.resolve(__dirname, 'src/interfaces') },
      { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'enums', replacement: path.resolve(__dirname, 'src/enums') },
    ],
  },
});
