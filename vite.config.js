import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'WanBitha - Portfolio & Art',
        short_name: 'WanBitha',
        description: 'Portfolio artístico e profissional de Wanessa.',
        theme_color: '#1A0A12',
        background_color: '#1A0A12',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // ═══ Amplify Optimization: Skip SW precaching for large 3D assets ═══
        globIgnores: ['**/textures/**'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          // ═══ Cache Unsplash images for gallery (external) ═══
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],

  // ═══ Amplify Production Build Optimizations ═══
  build: {
    // Vite 7 default target — supports modern browsers
    target: 'esnext',
    // Don't inline assets over 4KB (better CDN caching)
    assetsInlineLimit: 4096,
    // Generate source maps for debugging (blocked via headers in prod)
    sourcemap: false,
    // Rollup optimizations
    rollupOptions: {
      output: {
        // Manual chunks to optimize code-splitting
        manualChunks(id) {
          // ═══ Three.js ecosystem (~1MB) — cached separately ═══
          if (id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three')) {
            return 'vendor-three'
          }
          // ═══ Animation libraries (~70KB) ═══
          if (id.includes('node_modules/gsap') ||
              id.includes('node_modules/framer-motion')) {
            return 'vendor-animation'
          }
          // ═══ Core framework (React + Router + utilities) ═══
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/scheduler')) {
            return 'vendor-core'
          }
        },
      },
    },
    // Increase chunk size warning for Three.js heavy bundles
    chunkSizeWarningLimit: 600,
  },
})
