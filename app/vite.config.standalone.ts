import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Standalone offline build — inlines JS/CSS into a single index.html so the
 * app opens directly via file:// (double-click on Windows/Mac) without
 * hitting Chrome's file:// CORS block on ES module <script> and <link> tags.
 * Images under public/ (badges, visuals, banners) stay as separate files
 * referenced by relative path — plain <img src> loading is not subject to
 * the same file:// restriction. Run: npm run build:standalone
 */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    outDir: 'dist-standalone',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
