export declare function average(source: AsyncIterable<number>): Promise<number>;
export declare function average<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
