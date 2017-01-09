import { Tuple } from "./Interfaces";
export declare function StrictEqualityComparer<T>(x: T, y: T): boolean;
export declare function EqualityComparer<T>(x: T, y: T): boolean;
export declare function StringifyComparer<T>(x: T, y: T): boolean;
export declare function NumberComparer(x: number, y: number): number;
export declare function AsTuple<X, Y>(first: X, second: Y): Tuple<X, Y>;
export declare const ErrorString: {
    MoreThanOneElement: string;
    NoElements: string;
    NoMatch: string;
};
export declare class InvalidOperationException extends Error {
    message: string;
    constructor(message: string);
}
export declare class ArgumentOutOfRangeException extends RangeError {
    paramName: string;
    constructor(paramName: string);
}
export declare class ArrayIterator<T> implements IterableIterator<T> {
    private array;
    private index;
    constructor(array: T[]);
    next(): IteratorResult<T>;
    [Symbol.iterator](): this;
}
