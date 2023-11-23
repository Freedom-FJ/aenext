// father config
// https://github.com/umijs/father

import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/es',
    platform: 'browser',
  },
  cjs: {
    output: 'dist/lib',
  },
  umd: {
    output: 'dist/umd',
    name: 'aenext',
  },
});
