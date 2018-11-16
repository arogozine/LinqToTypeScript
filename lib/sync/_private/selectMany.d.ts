import { IEnumerable } from "../IEnumerable";
export declare function selectMany<TSource, TResult>(source: Iterable<TSource>, selector: (x: TSource) => Iterable<TResult>): IEnumerable<TResult>;
export declare function selectMany<TSource extends {
    [key: string]: Iterable<TResult>;
}, TResult>(source: Iterable<TSource>, selector: keyof TSource): IEnumerable<TResult>;
