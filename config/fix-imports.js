import { existsSync, writeFileSync } from 'fs'
import { dirname, join } from "path"
import ts from 'typescript'
const { createPrinter, isSourceFile, createCompilerHost, createProgram, isImportDeclaration, isExportDeclaration, isStringLiteral, ModuleKind, ModuleResolutionKind, ScriptTarget } = ts

/**
 * @param  {...string} path 
 * @returns {boolean}
 */
const existsDtsOrJs = (...path) => {
    const joined = join(...path)

    if (existsSync(joined + `.js`)) {
        return true;
    }

    if (existsSync(joined + `.d.ts`)) {
        return true;
    }

    return false
}

/**
 * 
 * @param {ts.SourceFile} sourceFile 
 * @returns {ts.TransformerFactory<ts.Node>}
 */
const generateTransformer = (sourceFile) => {
    const pathWithoutFileName = dirname(sourceFile.fileName);

    return (/** @type {ts.TransformationContext} */context) => (/** @type {ts.Node} */rootNode) => {

        function visit(/** @type {ts.Node} */node) {
            node = ts.visitEachChild(node, visit, context);

            // Import Declaration
            const parentNodeIsExportOrImport = node.parent &&
                (isImportDeclaration(node.parent) || isExportDeclaration(node.parent))

            // Node is the relative path of an import or export
            if (parentNodeIsExportOrImport && isStringLiteral(node)) {
                const relativePathWithQuotes = node.getFullText(sourceFile).trimStart()
                const relativePathWithoutQuotes = relativePathWithQuotes.substring(1, relativePathWithQuotes.length - 1)

                if (relativePathWithoutQuotes.includes(".js")) {
                    return node
                }

                const fullImportPath = join(pathWithoutFileName, relativePathWithoutQuotes);

                // Append .js or index.js to all imports
                if (existsDtsOrJs(fullImportPath)) {
                    node = context.factory.createStringLiteral(`${relativePathWithoutQuotes}.js`)
                }
                else if (existsDtsOrJs(fullImportPath, "index")) {
                    node = context.factory.createStringLiteral(`${relativePathWithoutQuotes}/index.js`)
                }
                else {
                    throw new Error(`Can't fix TypeScript paths: ${node.getFullText(sourceFile)}`)
                }
            }
            
            return node
        }

        return ts.visitNode(rootNode, visit)
      }
}

/**
 * Add .js extension to imports and exports
 * Specify index.js for folder imports
 * @param {string} indexPath
 * @param {boolean} parseDeclaration
 */
const addJsToImportAndExports = (indexPath, parseDeclaration) => {
    /** @type {ts.CompilerOptions} */
    const compilerOptions = {
        moduleResolution: ModuleResolutionKind.NodeJs,
        module: ModuleKind.NodeNext,
        esModuleInterop: true,
        target: ScriptTarget.ESNext,
        lib: [
            "es2020"
        ],
        allowJs: true,
        checkJs: true
    };

    const host = createCompilerHost(compilerOptions);
    const program = createProgram([indexPath], compilerOptions, host);
    const sourceFiles = program.getSourceFiles();

    for (const sourceFile of sourceFiles) {
        if (sourceFile.fileName.includes(`node_modules/`)) {
            continue;
        }

        if (parseDeclaration || !sourceFile.isDeclarationFile) {
            const result = ts.transform(
                sourceFile, [generateTransformer(sourceFile)]
            )
        
            const transformedSourceFile = result.transformed[0]
            if (isSourceFile(transformedSourceFile)) {
                const printer = createPrinter()
                const file = printer.printFile(transformedSourceFile)
                writeFileSync(sourceFile.fileName, file)
            }
        }
    }
}

addJsToImportAndExports("./dist/esm/index.js", false)
addJsToImportAndExports("./dist/types/index.d.ts", true)