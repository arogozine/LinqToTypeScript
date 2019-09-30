// https://raw.githubusercontent.com/Hotell/typescript-lib-starter/master/config/types.d.ts
// https://github.com/Hotell/typescript-lib-starter/blob/master/LICENSE.md

// ==== ROLLUP ====
export type RollupConfig = import('rollup').InputOptions & {
  output:
    | import('rollup').OutputOptions
    | Array<import('rollup').OutputOptions | null>
}
export type RollupPlugin = import('rollup').Plugin