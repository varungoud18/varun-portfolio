import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-sync resume copies in public directory for backward and forward compatibility
try {
  const neoResume = path.resolve(__dirname, 'public/NeoResume.pdf')
  const resume = path.resolve(__dirname, 'public/resume.pdf')
  if (fs.existsSync(neoResume) && !fs.existsSync(resume)) {
    fs.copyFileSync(neoResume, resume)
  }
} catch (err) {
  console.warn('Resume copy sync warning:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
