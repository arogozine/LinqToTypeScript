export declare function min(source: AsyncIterable<number>): Promise<number>;
export declare function min<TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>;
