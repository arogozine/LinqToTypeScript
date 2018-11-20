import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
export declare function whereAsync<T>(source: Iterable<T>, predicate: (x: T, index: number) => Promise<boolean>): IAsyncEnumerable<T>;
