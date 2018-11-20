import { IAsyncEnumerable } from "../../async/IAsyncEnumerable";
export declare function zipAsync<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
