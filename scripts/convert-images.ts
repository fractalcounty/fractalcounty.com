import fs from 'node:fs/promises'
import path from 'node:path'
import { exit } from 'node:process'
import { glob } from 'glob'
import kleur from 'kleur'
import ora from 'ora'
import sharp from 'sharp'

// image extensions to process
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif']

async function convertToWebp() {
  const spinner = ora()
  try {
    spinner.start(kleur.blue('searching for images...'))

    // find all image files in content directory
    const files = await glob(`./src/content/**/*.{${IMAGE_EXTENSIONS.join(',')}}`, {
      nodir: true,
    })

    if (files.length === 0) {
      spinner.info(kleur.yellow('no images found to convert'))
      return
    }

    spinner.succeed(kleur.green(`found ${kleur.bold(files.length)} images to convert`))

    for (const [index, file] of files.entries()) {
      const outputPath = file.replace(/\.[^.]+$/, '.webp')
      const progress = `[${index + 1}/${files.length}]`
      
      spinner.start(kleur.blue(`${progress} converting ${kleur.bold(path.basename(file))}...`))
      
      // convert image to webp
      await sharp(file)
        .webp({ 
          lossless: true,
          effort: 6 // max compression effort
        })
        .toFile(outputPath)

      // remove original file after successful conversion
      await fs.unlink(file)
      
      spinner.succeed(kleur.green(
        `${progress} ${kleur.bold(path.basename(file))} → ${kleur.bold(path.basename(outputPath))}`
      ))
    }

    spinner.succeed(kleur.green('✨ all images converted successfully!'))
  }
  catch (err) {
    spinner.fail(kleur.red('error converting images:'))
    
    // type-safe error handling
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'unknown error occurred'
      
    console.error(kleur.red(errorMessage))
    exit(1) // using node:process instead of Bun.exit
  }
}

// run the conversion with proper promise handling
void convertToWebp()