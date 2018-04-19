import { ITuple } from "./ITuple";
/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 */
export declare function StrictEqualityComparer<T>(x: T, y: T): boolean;
/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
export declare function EqualityComparer<T>(x: T, y: T): boolean;
/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
export declare function StringifyComparer<T>(x: T, y: T): boolean;
/**
 * Compares two numeric values.
 * @param x left value
 * @param y right value
 */
export declare function NumberComparer(x: number, y: number): number;
/**
 * Creates a tuple.
 * @param X first value
 * @param Y second value
 */
export declare function AsTuple<X, Y>(first: X, second: Y): ITuple<X, Y>;
/**
 * Common Error Strings
 */
export declare const ErrorString: Readonly<{
    MoreThanOneElement: string;
    MoreThanOneMatchingElement: string;
    NoElements: string;
    NoMatch: string;
}>;
/**
 * Invalid Operation Exception
 */
export declare class InvalidOperationException extends Error {
    message: string;
    constructor(message: string);
}
/**
 * Exception thrown when the passed in argument
 * is out of range.
 */
export declare class ArgumentOutOfRangeException extends RangeError {
    readonly paramName: string;
    constructor(paramName: string);
}
