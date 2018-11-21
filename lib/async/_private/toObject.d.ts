export declare function toObject<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => string): Promise<{
    [key: string]: TSource;
}>;
