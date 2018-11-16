import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IGrouping } from "../../shared/IGrouping";
import { IEnumerable } from "../IEnumerable";
export declare function groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>;
export declare function groupByWithSel<TSource, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>;
export declare function groupByWithSel<TSource, TKey, TElement>(source: Iterable<TSource>, keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
