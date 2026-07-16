import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-copy user's uploaded profile picture
const srcFile = 'C:\\Users\\varun\\.gemini\\antigravity\\brain\\2135be7b-bc07-4017-81d9-e01e72da58e5\\media__1784160638045.jpg'
const destFile = path.resolve(__dirname, 'public/profile.jpg')

try {
  if (fs.existsSync(srcFile)) {
    // Ensure destination directory exists
    const destDir = path.dirname(destFile)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    fs.copyFileSync(srcFile, destFile)
    console.log('Successfully copied profile photo to public/profile.jpg')
  } else {
    console.warn('Source profile photo not found at:', srcFile)
  }
} catch (err) {
  console.error('Failed to copy profile photo:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
