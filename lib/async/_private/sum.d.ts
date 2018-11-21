export declare function sum(source: AsyncIterable<number>): Promise<number>;
export declare function sum<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
