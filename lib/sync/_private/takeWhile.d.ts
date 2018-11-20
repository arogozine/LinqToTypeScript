import { IEnumerable } from "../IEnumerable";
export declare function takeWhile<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
