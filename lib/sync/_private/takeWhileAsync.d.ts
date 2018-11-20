import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
export declare function takeWhileAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
