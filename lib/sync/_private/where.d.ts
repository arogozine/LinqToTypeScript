import { IEnumerable } from "../IEnumerable";
export declare function where<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
export declare function where_1<T>(source: Iterable<T>, predicate: (x: T) => boolean): IEnumerable<T>;
export declare function where_2<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
