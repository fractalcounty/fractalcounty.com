import { access, copyFile , mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import glob from 'fast-glob'

async function syncContentImages() {
  const images = await glob('src/content/**/*.{png,jpg,jpeg,webp,avif}')
  
  for (const imagePath of images) {
    const publicPath = imagePath.replace('src/content/', 'public/images/')
    
    try {
      // check if file exists first
      await access(publicPath)
      console.log(`Skipping ${imagePath} - already exists`)
      continue
    } catch {
      // file doesn't exist, proceed with copy
      await mkdir(dirname(publicPath), { recursive: true })
      await copyFile(imagePath, publicPath)
      console.log(`Copied ${imagePath} to ${publicPath}`)
    }
  }
}

void (async () => {
  await syncContentImages()
})()