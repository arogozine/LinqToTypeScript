import { ITuple } from "./ITuple";
export declare function StrictEqualityComparer<T>(x: T, y: T): boolean;
export declare function EqualityComparer<T>(x: T, y: T): boolean;
export declare function StringifyComparer<T>(x: T, y: T): boolean;
export declare function NumberComparer(x: number, y: number): number;
export declare function AsTuple<X, Y>(first: X, second: Y): ITuple<X, Y>;
export declare const ErrorString: Readonly<{
    MoreThanOneElement: string;
    NoElements: string;
    NoMatch: string;
}>;
export declare class InvalidOperationException extends Error {
    message: string;
    constructor(message: string);
}
export declare class ArgumentOutOfRangeException extends RangeError {
    paramName: string;
    constructor(paramName: string);
}
