import { IAsyncEqualityComparer, IAsyncParallel, IEqualityComparer, IGrouping, IParallelEnumerable } from "../types";
import { BasicParallelEnumerable } from "./BasicParallelEnumerable";
export declare function groupBy_0_Simple<TSource>(source: IAsyncParallel<TSource>, keySelector: ((x: TSource) => string) | ((x: TSource) => number)): IParallelEnumerable<IGrouping<string | number, TSource>>;
export declare function groupBy_0<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
export declare function groupByAsync_0_Simple<TSource>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<string>): IParallelEnumerable<IGrouping<string | number, TSource>>;
export declare function groupByAsync_0<TSource, TKey>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => Promise<TKey> | TKey, comparer: IEqualityComparer<TKey> | IAsyncEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TSource>>;
export declare function groupBy_1_Simple<TSource, TElement>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => string | number, elementSelector: (x: TSource) => TElement): IParallelEnumerable<IGrouping<string | number, TElement>>;
export declare function groupBy_1<TSource, TKey, TElement>(source: IAsyncParallel<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IParallelEnumerable<IGrouping<TKey, TElement>>;
export declare function repeat_1<T>(element: T, count: number): IParallelEnumerable<T>;
export declare function repeat_2<T>(element: T, count: number, delay: number): IParallelEnumerable<T>;
export declare function union_1<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): BasicParallelEnumerable<TSource>;
export declare function union_2<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IEqualityComparer<TSource>): BasicParallelEnumerable<TSource>;
export declare function zip_1<T, Y>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]>;
export declare function zip_2<T, Y, OUT>(source: IAsyncParallel<T>, second: IAsyncParallel<Y>, resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT>;
