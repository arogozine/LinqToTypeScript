import { writeFileSync, copyFileSync, statSync } from 'fs'
import { resolve, basename, dirname } from 'path'
import { fileURLToPath } from 'url';
import packageJson from '../package.json' assert { type: "json" }

// https://stackoverflow.com/a/62892482
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

main()

function main() {
  const projectRoot = resolve(__dirname, '..')
  const distPath = resolve(projectRoot, 'dist')
  const distPackageJson = createDistPackageJson(packageJson)

  const cpFiles = ['README.md', 'ATTRIBUTION.md', 'LICENSE', '.gitignore'].map(
    (file) => resolve(projectRoot, file)
  )

  cp(cpFiles, distPath)

  writeFileSync(resolve(distPath, 'package.json'), distPackageJson)

  commonJsFix()
}

/**
 * Creates package.json file (that specifies common js) in dist/commonjs folder
 */
function commonJsFix() {
  const commonJs = `
  {
    "type": "commonjs"
  }
  `

  const filePath = resolve(__dirname, '../dist/commonjs/package.json')
  writeFileSync(filePath, commonJs)
}

/**
 *
 * @param {string[]|string} source
 * @param {string} target
 */
function cp(source, target) {
  const isDir = statSync(target).isDirectory()

  if (isDir) {
    if (!Array.isArray(source)) {
      throw new Error(
        'if <target> is directory you need to provide source as an array'
      )
    }

    source.forEach((file) =>
      copyFileSync(file, resolve(target, basename(file)))
    )

    return
  }

  copyFileSync(/** @type {string} */ (source), target)
}

/**
 * @param {typeof packageJson} packageConfig
 * @return {string}
 */
function createDistPackageJson(packageConfig) {
  const {
    devDependencies,
    scripts,
    engines,
    ...distPackageJson
  } = packageConfig

  return JSON.stringify(distPackageJson, null, 2)
}