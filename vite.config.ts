/// <reference types="vitest" />

import macrosPlugin from "vite-plugin-babel-macros"
import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import federation from "@originjs/vite-plugin-federation";

import manifest from './manifest.json';
// import { dependencies } from './package.json';


// function renderChunks(deps: Record<string, string>) {
//   let chunks = {};
//   Object.keys(deps).forEach((key) => {
//     if (['react', 'react-router-dom', 'react-dom', 'firebase'].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: {
        //@ts-ignore
        enabled: process.env.NODE_ENV !== 'production', 
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000,
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        globIgnores: [
          "**/node_modules/**/*",
          "sw.js",
          "workbox-*.js"
        ]
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
    federation({
      name: "app",
      remotes: [
        {
          remoteApp: {
            external: 'https://pbcustom.netlify.app/assets/remoteEntry.js',
            from: 'vite',
            externalType: 'url'
          },
        },
      ],
      shared: ["react", "react-dom", "@react-three/drei", "@react-three/fiber"],
    }),
    macrosPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    //sourcemap: false,
    //modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vendor: ['react', 'react-router-dom', 'react-dom', 'firebase'],
    //       ...renderChunks(dependencies),
    //     },
    //   },
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
