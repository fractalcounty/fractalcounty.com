/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { Ora } from 'ora'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { glob } from 'glob'
import kleur from 'kleur'
import ora from 'ora'
import prompts from 'prompts'
import sharp from 'sharp'

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'avif']
const CONTENT_DIR = 'src/content'
const PUBLIC_DIR = 'public/images'

interface ProcessStats {
  converted: number
  skipped: number
  synced: number
}

interface MediaAction {
  type: 'convert' | 'sync'
  source: string
  destination: string
}

// helper to truncate paths
function formatPath(filePath: string, maxLength = 40): string {
  if (filePath.length <= maxLength) return filePath

  const parts = filePath.split('/')
  const fileName = parts.pop() ?? ''
  const dirPath = parts.join('/')

  if (fileName.length > maxLength - 5)
    return `...${fileName.slice(-(maxLength - 5))}`

  const availableLength = maxLength - fileName.length - 5
  return `...${dirPath.slice(-availableLength)}/${fileName}`
}

async function getMediaActions(): Promise<MediaAction[]> {
  const actions: MediaAction[] = []

  // find convertible images
  const imagesToConvert = await glob(
    `${CONTENT_DIR}/**/*.{${IMAGE_EXTENSIONS.join(',')}}`,
    { nodir: true, absolute: true }
  )

  // add conversion actions
  actions.push(
    ...imagesToConvert.map((file) => ({
      type: 'convert' as const,
      source: file,
      destination: file.replace(/\.[^.]+$/, '.webp'),
    }))
  )

  // find media to sync
  const mediaToSync = await glob(`${CONTENT_DIR}/**/*.{webp,webm}`, {
    nodir: true,
    absolute: true,
  })

  // add sync actions
  actions.push(
    ...mediaToSync.map((file) => ({
      type: 'sync' as const,
      source: file,
      destination: path.join(PUBLIC_DIR, path.relative(CONTENT_DIR, file)),
    }))
  )

  return actions
}

async function displayActions(actions: MediaAction[], spinner: Ora) {
  const conversions = actions.filter((a) => a.type === 'convert')
  const syncs = actions.filter((a) => a.type === 'sync')

  if (conversions.length > 0) {
    spinner.info(kleur.cyan(`\nwill convert ${conversions.length} images:\n`))
    conversions.slice(0, 3).forEach(({ source, destination }) => {
      const sourceName = formatPath(path.basename(source))
      const destName = formatPath(path.basename(destination))
      console.log(
        kleur.yellow('• ') +
          kleur.white(sourceName) +
          kleur.dim(' → ') +
          kleur.green(destName)
      )
    })
    if (conversions.length > 3)
      console.log(kleur.yellow(`... and ${conversions.length - 3} more\n`))
  }

  if (syncs.length > 0) {
    spinner.info(kleur.cyan(`will sync ${syncs.length} files:\n`))
    syncs.slice(0, 3).forEach(({ source, destination }) => {
      const sourcePath = formatPath(path.relative(CONTENT_DIR, source))
      const destPath = formatPath(path.relative(PUBLIC_DIR, destination))
      console.log(
        kleur.yellow('• ') +
          kleur.white(sourcePath) +
          kleur.dim(' → ') +
          kleur.green(destPath)
      )
    })
    if (syncs.length > 3)
      console.log(kleur.yellow(`... and ${syncs.length - 3} more\n`))
  }
}

// modify executeActions to accept force parameter
async function executeActions(
  actions: MediaAction[],
  spinner: Ora | SilentSpinner,
  force = false
): Promise<ProcessStats> {
  const stats: ProcessStats = { converted: 0, skipped: 0, synced: 0 }

  // only prompt if not in force mode
  if (!force) {
    const response = (await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'proceed with these changes?',
      initial: true,
    })) as { confirm: boolean }

    if (!response.confirm) {
      spinner.info('operation cancelled')
      process.exit(0)
    }
  }

  // handle conversions first
  const conversions = actions.filter((a) => a.type === 'convert')
  if (conversions.length > 0) {
    spinner.start(kleur.blue(`converting ${conversions.length} images...`))

    for (const [index, action] of conversions.entries()) {
      try {
        await sharp(action.source)
          .webp({
            lossless: true,
            effort: 6,
          })
          .toFile(action.destination)

        await fs.unlink(action.source)
        stats.converted++
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'unknown error'
        spinner.warn(
          kleur.yellow(`failed to convert ${action.source}: ${errorMessage}`)
        )
      }

      if ((index + 1) % 10 === 0 || index === conversions.length - 1) {
        spinner.text = kleur.blue(
          `converting... ${index + 1}/${conversions.length}`
        )
      }
    }
  }

  // handle syncs
  const syncs = actions.filter((a) => a.type === 'sync')
  if (syncs.length > 0) {
    spinner.start(kleur.blue(`syncing ${syncs.length} files...`))

    for (const [index, action] of syncs.entries()) {
      try {
        await fs.access(action.destination)
        stats.skipped++
      } catch {
        await fs.mkdir(path.dirname(action.destination), { recursive: true })
        await fs.copyFile(action.source, action.destination)
        stats.synced++
      }

      if ((index + 1) % 10 === 0 || index === syncs.length - 1) {
        spinner.text = kleur.blue(`syncing... ${index + 1}/${syncs.length}`)
      }
    }
  }

  return stats
}

// modify the mock spinner to include all needed methods
interface SilentSpinner {
  start: (text?: string) => void
  info: (text?: string) => void
  succeed: (text?: string) => void
  fail: (text?: string) => void
  warn: (text?: string) => void
  text: string
}

export async function processMedia(silent = false, force = false) {
  const spinner: Ora | SilentSpinner = silent
    ? {
        start: () => {},
        info: () => {},
        succeed: () => {},
        fail: () => {},
        warn: () => {},
        text: '',
      }
    : ora()

  try {
    spinner.start('analyzing media files...')
    const actions = await getMediaActions()

    if (actions.length === 0) {
      if (!silent) spinner.info(kleur.yellow('no media files to process'))
      return
    }

    // only show actions if not silent
    if (!silent) await displayActions(actions, spinner as Ora)

    // pass force parameter to executeActions
    const stats = await executeActions(actions, spinner, force)

    if (!silent) {
      spinner.succeed(
        kleur.green(
          `✨ done! ${
            stats.converted > 0 ? `converted ${stats.converted} images ` : ''
          }${stats.synced > 0 ? `synced ${stats.synced} new files ` : ''}${
            stats.skipped > 0 ? `skipped ${stats.skipped} existing files` : ''
          }`
        )
      )
    }
  } catch (err) {
    if (!silent) {
      spinner.fail(kleur.red('error processing media:'))
      console.error(
        kleur.red(err instanceof Error ? err.message : 'unknown error')
      )
    }
    process.exit(1)
  }
}

// check for force flag when running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const forceMode =
    process.argv.includes('--force') || process.argv.includes('-f')
  void processMedia(false, forceMode)
}
