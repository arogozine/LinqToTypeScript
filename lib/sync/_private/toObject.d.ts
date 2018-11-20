export declare function toObject<TSource>(source: Iterable<TSource>, selector: (x: TSource) => string): {
    [key: string]: TSource;
};
