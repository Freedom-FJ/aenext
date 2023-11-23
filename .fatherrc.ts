// father config
// https://github.com/umijs/father

import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    input: './packages/index.ts',
    output: 'dist/es',
    platform: 'browser',
  },
  cjs: {
    input: './packages/index.ts',
    output: 'dist/lib',
  },
  umd: {
    entry: './packages/index.ts',
    output: 'dist/umd',
    name: 'aenext',
  },
});
