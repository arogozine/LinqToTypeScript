import { IEnumerable } from "../../types";
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>;
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>;
export declare function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>;
