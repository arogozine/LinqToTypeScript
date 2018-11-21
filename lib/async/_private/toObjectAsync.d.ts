export declare function toObjectAsync<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
    [key: string]: TSource;
}>;
