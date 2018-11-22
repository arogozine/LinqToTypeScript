/**
 * Exception thrown when the passed in argument
 * is out of range.
 */
export declare class ArgumentOutOfRangeException extends RangeError {
    readonly paramName: string;
    constructor(paramName: string);
}
