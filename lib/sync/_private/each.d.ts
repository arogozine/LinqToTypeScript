import { IEnumerable } from "../../types";
export declare function each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource>;
