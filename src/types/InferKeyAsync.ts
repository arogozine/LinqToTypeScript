export type InferKey<TSelector> =
    TSelector extends (x: any) => number ? number : string

export type InferKeyAsync<TSelector> =
    TSelector extends (x: any) => Promise<number> ? number : string
