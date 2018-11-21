import { IAsyncEnumerable } from "../../types";
export declare function zipAsync<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => Promise<OUT>): IAsyncEnumerable<OUT>;
