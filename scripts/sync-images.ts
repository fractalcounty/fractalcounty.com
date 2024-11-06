import { copyFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import glob from 'fast-glob'

async function syncContentImages() {
  // find all image files
  const images = await glob('src/content/**/*.{png,jpg,jpeg,webp,avif}')
  
  for (const imagePath of images) {
    // create equivalent path in public/images to maintain structure
    const publicPath = imagePath.replace(
      'src/content/',
      'public/images/'
    )
    
    // ensure directory exists
    await mkdir(dirname(publicPath), { recursive: true })
    
    // copy file
    await copyFile(imagePath, publicPath)
    
    console.log(`Copied ${imagePath} to ${publicPath}`)
  }
}

// add await to handle the promise
void (async () => {
  await syncContentImages()
})()