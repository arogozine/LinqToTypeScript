export declare function sumAsync<TSource>(source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
