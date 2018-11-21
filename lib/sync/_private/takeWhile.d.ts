import { IEnumerable } from "../../types";
export declare function takeWhile<T>(source: Iterable<T>, predicate: (x: T, index: number) => boolean): IEnumerable<T>;
