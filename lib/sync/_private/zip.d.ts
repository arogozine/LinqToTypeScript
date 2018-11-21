import { IEnumerable, ITuple } from "../../types";
export declare function zip<T, Y>(source: Iterable<T>, second: Iterable<Y>): IEnumerable<ITuple<T, Y>>;
export declare function zip<T, Y, OUT>(source: Iterable<T>, second: Iterable<Y>, resultSelector: (x: T, y: Y) => OUT): IEnumerable<OUT>;
