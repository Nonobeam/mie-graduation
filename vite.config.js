import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false, // Bundle all CSS into one file
    assetsInlineLimit: 0, // Don't inline assets
  },
  server: {
    proxy: {
      '/api/sheets': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sheets/, '/macros/s/AKfycbyxxnMFuGfBmNDLz285QglBiyyBvoGQCpz92axC7jrUhdnjBbyzInK9Q09XtFYTpcWUow/exec'),
        secure: true,
      }
    }
  }
})
