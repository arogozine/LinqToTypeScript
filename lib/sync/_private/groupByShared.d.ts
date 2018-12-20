import { IEnumerable, IEqualityComparer, IGrouping, SelectorKeyType } from "../../types";
import { Grouping } from "../Grouping";
/**
 * Group and Iterable Based on a Generic Key and an equality comparer
 * @param source Iteration
 * @param keySelector Key Selector
 * @param comparer Key Comparer
 * @private Don't Use Directly
 */
export declare const groupBy_0: <TSource, TKey>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>) => () => IterableIterator<Grouping<TKey, TSource>>;
/**
 * @private Don't Use Directly
 */
export declare const groupBy_0_Simple: <TSource, TKey extends string | number>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey) => () => IterableIterator<Grouping<TKey, TSource>>;
/**
 * @private Don't Use Directly
 */
export declare function groupBy_1_Simple<TSource, TKey extends SelectorKeyType, TElement>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<TKey, TElement>>;
/**
 * @private Don't Use Directly
 */
export declare function groupBy_1<TSource, TKey, TElement>(source: Iterable<TSource>, keySelector: (x: TSource) => TKey, elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
