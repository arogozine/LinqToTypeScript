import { IEnumerable } from "../IEnumerable";
export declare function skipWhile<TSource>(source: Iterable<TSource>, predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
