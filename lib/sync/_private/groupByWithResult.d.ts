import { IEnumerable, IEqualityComparer } from "../../types";
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => string, resultSelector: (x: string, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<string>): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: number, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<number>): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupByWithResult<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => number, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
export declare function groupBy_2_Simple<TSource, TResult>(source: Iterable<TSource>, keySelector: ((x: TSource) => string) | ((x: TSource) => number), resultSelector: (x: string | number, values: IEnumerable<TSource>) => TResult): IEnumerable<TResult>;
export declare function groupBy_2<TSource, TKey, TResult>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, resultSelector: (x: TKey, values: IEnumerable<TSource>) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;