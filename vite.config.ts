import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add the VitePWA plugin
    VitePWA({
      // Automatically register the service worker
      registerType: 'autoUpdate',
      // Include the manifest file and assets
      includeAssets: ['favicon.svg', 'apple-touch-icon.svg', 'mask-icon.svg'],
      manifest: {
        // Basic manifest properties
        name: 'Badminton Leaderboard',
        short_name: 'BadmintonApp',
        description: 'A leaderboard app for badminton games.',
        theme_color: '#ffffff',
        // Define icons for different platforms
        icons: [
          {
            // Standard PWA icon
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            // Larger PWA icon
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            // Maskable icon for Android
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          }
        ]
      }
    })
  ],
})
