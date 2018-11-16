import { IEqualityComparer } from "../../shared/IEqualityComparer";
import { IEnumerable } from "../IEnumerable";
export declare function join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult): IEnumerable<TResult>;
export declare function join<TOuter, TInner, TKey, TResult>(outer: Iterable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (x: TOuter) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TOuter, y: TInner) => TResult, comparer: IEqualityComparer<TKey>): IEnumerable<TResult>;
