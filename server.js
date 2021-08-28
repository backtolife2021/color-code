/* eslint-disable default-case */
/* eslint-disable promise/catch-or-return */
import fs from 'fs'
import http from 'http'
import path from 'path'

import { bold, cyan, green, red } from 'colorette'
import * as rollup from 'rollup'
import metablock from 'rollup-plugin-userscript-metablock'
import handler from 'serve-handler'

const loadConfigFile = require('rollup/dist/loadConfigFile')
const pkg = require('./package.json')
const meta = require('./meta.json')

console.log('👀 watch & serve 🤲\n###################\n')

const port = pkg.config.port
const destDir = 'dist/'
const devScriptInFile = 'dev.user.js'

const hyperlink = (url, title) => `\u001B]8;;${url}\u0007${title || url}\u001B]8;;\u0007`

fs.mkdir('dist/', { recursive: true }, () => null)

// Start web server
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: destDir,
  })
})
server.listen(port, () => {
  console.log(`Running webserver at ${hyperlink(`http://localhost:${port}`)}`)
})

// Create the userscript for development 'dist/dev.user.js'
const devScriptOutFile = path.join(destDir, devScriptInFile)
console.log(
  cyan(
    `generate development userscript ${bold('package.json')}, ${bold('meta.json')}, ${bold(
      devScriptInFile
    )} → ${bold(devScriptOutFile)}...`
  )
)
const devScriptContent = fs
  .readFileSync(devScriptInFile, 'utf8')
  .replace(/%PORT%/gm, port.toString())
const grants = 'grant' in meta ? meta.grant : []
if (!grants.includes('GM.xmlHttpRequest')) {
  grants.push('GM.xmlHttpRequest')
}
if (!grants.includes('GM.setValue')) {
  grants.push('GM.setValue')
}
if (!grants.includes('GM.getValue')) {
  grants.push('GM.getValue')
}
const devMetablock = metablock({
  file: './meta.json',
  override: {
    name: pkg.name + ' [dev]',
    version: pkg.version,
    description: pkg.description,
    homepage: pkg.homepage,
    author: pkg.author,
    license: pkg.license,
    grant: grants,
  },
})

const result = devMetablock.renderChunk(devScriptContent, null, { sourcemap: false })
const outContent = typeof result === 'string' ? result : result.code
fs.writeFileSync(devScriptOutFile, outContent)
console.log(
  green(`created ${bold(devScriptOutFile)}. Please install in Tampermonkey: `) +
    hyperlink(`http://localhost:${port}/${devScriptInFile}`)
)

loadConfigFile(path.resolve(__dirname, 'rollup.config.js')).then(
  async ({ options, warnings }) => {
    // Start rollup watch
    const watcher = rollup.watch(options)

    watcher.on('event', (event) => {
      switch (event.code) {
        case 'BUNDLE_START': {
          console.log(
            cyan(
              `bundles ${bold(event.input)} → ${bold(
                event.output
                  .map((fullPath) => path.relative(path.resolve(__dirname), fullPath))
                  .join(', ')
              )}...`
            )
          )

          break
        }
        case 'BUNDLE_END': {
          console.log(
            green(
              `created ${bold(
                event.output
                  .map((fullPath) => path.relative(path.resolve(__dirname), fullPath))
                  .join(', ')
              )} in ${event.duration}ms`
            )
          )

          break
        }
        case 'ERROR': {
          console.log(bold(red('⚠ Error')))
          console.log(event.error)

          break
        }
        // No default
      }
      if ('result' in event && event.result) {
        event.result.close()
      }
    })

    // stop watching
    watcher.close()
  }
)

export default {}
