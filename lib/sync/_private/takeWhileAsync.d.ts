import { IAsyncEnumerable } from "../../types";
export declare function takeWhileAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
