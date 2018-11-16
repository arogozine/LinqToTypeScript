import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IGrouping } from "../../shared/IGrouping";
import { IEnumerable } from "../IEnumerable";
export declare function groupBy_0<TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
export declare function groupBy_0_Simple<TSource>(source: Iterable<TSource>, keySelector: ((x: TSource) => string) | ((x: TSource) => number)): IEnumerable<IGrouping<string | number, TSource>>;
export declare function groupBy_1_Simple<TSource, TElement>(source: Iterable<TSource>, keySelector: (x: TSource) => string | number, elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string | number, TElement>>;
export declare function groupBy_1<TSource, TKey, TElement>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
