import { readFile, writeFile } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url';

// https://stackoverflow.com/a/62892482
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const indexJsPath = resolve(__dirname, `./../doc/index.html`)

readFile(indexJsPath, (error, data) => {

    if (error) {
        throw error
    }

    // Replace Tests Paths for Documentation
    const masterPath = `https://github.com/arogozine/LinqToTypeScript/blob/master/`
    let indexHtml = data.toString()
    indexHtml = indexHtml.replaceAll(`href="tests/`, `href="${masterPath}tests/`)

    writeFile(indexJsPath, indexHtml, () => {})
})