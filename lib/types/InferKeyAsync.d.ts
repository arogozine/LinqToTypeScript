export declare type InferKey<TSelector> = TSelector extends (x: any) => number ? number : string;
export declare type InferKeyAsync<TSelector> = TSelector extends (x: any) => Promise<number> ? number : string;
