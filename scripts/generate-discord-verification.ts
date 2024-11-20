import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from '../src/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const wellKnownPath = join(__dirname, '../public/.well-known')
const discordFile = join(wellKnownPath, 'discord')

// directly access config
const hash = site.integrations?.discord?.verificationHash
if (hash) {
  mkdirSync(wellKnownPath, { recursive: true })
  writeFileSync(discordFile, `dh=${hash}\n`)
  console.log('✓ Generated Discord verification file')
}
