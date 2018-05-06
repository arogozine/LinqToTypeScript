export declare type KeySelector<TSource> = ((x: TSource) => number) | ((x: TSource) => string);
export declare type KeySelectorAsync<TSource> = ((x: TSource) => Promise<number>) | ((x: TSource) => Promise<string>);
