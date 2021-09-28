import { readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url';

// https://stackoverflow.com/a/62892482
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const indexJsPath = resolve(__dirname, `./../doc/index.html`)

let indexHtml = readFileSync(indexJsPath).toString()

// Use absolute paths to tests/ and examples/ for documentation
// otherwise they don't work
const masterPath = `https://github.com/arogozine/LinqToTypeScript/blob/master/`
indexHtml = indexHtml.replaceAll(`href="tests/`, `href="${masterPath}tests/`)
indexHtml = indexHtml.replaceAll(`href="/examples"`, `href="${masterPath}examples"`)

writeFileSync(indexJsPath, indexHtml)