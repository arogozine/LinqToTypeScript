export declare function sum(source: Iterable<number>): number;
export declare function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number;
