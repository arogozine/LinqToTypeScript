export declare function toObjectAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<string>): Promise<{
    [key: string]: TSource;
}>;
