import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function GroupByWithResultAndSelector<TSource, TKey, TElement, TResult>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey) | ((x: TSource) => string) | ((x: TSource) => number), elementSelector: (x: TSource) => TElement, resultSelector: ((key: TKey, values: IEnumerable<TElement>) => TResult) | ((key: string | number, values: IEnumerable<TElement>) => TResult), comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
