import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IGrouping } from "../../shared/IGrouping";
import { IEnumerable } from "../IEnumerable";
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
export declare function groupBy<TSource>(source: Iterable<TSource>, keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
export declare function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
