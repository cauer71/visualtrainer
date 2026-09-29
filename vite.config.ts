/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// base: './' → die gebaute Seite funktioniert in jedem Unterordner und im iframe.
export default defineConfig({
  base: './',
  plugins: [preact()],
  build: {
    target: 'es2020',
    sourcemap: false,
    assetsInlineLimit: 8192,
  },
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
