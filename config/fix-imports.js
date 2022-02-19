// Adapted from,
// typescript-esm-example
// By Andrey Sakharov
// Original: https://github.com/muturgan/typescript-esm-example/blob/main/buildtools/fix-imports.js
// MIT License: https://github.com/muturgan/typescript-esm-example/blob/main/LICENSE

import { extname, join } from 'path';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';

const START_PATH = join(process.cwd(), 'dist/esm');
const IMPORT_REGEXP = /^((import|export) [^';]* from "(\.\/|(\.\.\/)+)[^";]*)"/g;
const JUST_ADD_AN_EXTENSION = `$1.js"`;
const ADD_INDEX_FILE = `$1/index.js"`;
const JS_EXT = '.js';

/**
 * @param {string} rootPath
 */
function fixImportsAtFolder(rootPath) {
    const entries = readdirSync(rootPath);

    entries.forEach((entry) => {
        const entryPath = join(rootPath, entry);
        if (entry.endsWith(JS_EXT)) {
            fixImportsAtFile(entryPath);
        }
        else {
            const extName = extname(entry);
            if (!extName) {
                const stat = statSync(entryPath);
                if (stat.isDirectory()) {
                    fixImportsAtFolder(entryPath);
                }
            }
        }
    });
}

/**
 * 
 * @param {string} filePath 
 */
function fixImportsAtFile(filePath) {
    const content = readFileSync(filePath).toString('utf8');
    const lines = content.split('\n');
    const fixedLines = lines.map((l) => {
        if (!l.match(IMPORT_REGEXP)) {
            return l;
        }

        const [_, importPath] = l.split(`"`);
        const fullPath = join(filePath, '..', importPath);
        const exists = existsSync(fullPath);
        if (exists === false) {
            return l.replace(IMPORT_REGEXP, JUST_ADD_AN_EXTENSION);
        }

        const stat = statSync(fullPath);
        const isDirectory = stat.isDirectory();
        if (isDirectory === true) {
            return l.replace(IMPORT_REGEXP, ADD_INDEX_FILE);
        }

        return l;
    });
    const withFixedImports = fixedLines.join('\n');
    writeFileSync(filePath, withFixedImports);
}

fixImportsAtFolder(START_PATH);