import { ITuple } from "./ITuple"

// ########################
// ## Equality Comparers ##
// ########################

/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 */
export function StrictEqualityComparer<T>(x: T, y: T): boolean {
    return x === y
}

/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
export function EqualityComparer<T>(x: T, y: T): boolean {
    /* tslint:disable */
    return x == y
    /* tslint:enable */
}

/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
export function StringifyComparer<T>(x: T, y: T): boolean {
    return JSON.stringify(x) === JSON.stringify(y)
}

// #####################
// ## Order Comparers ##
// #####################

/**
 * Compares two numeric values.
 * @param x left value
 * @param y right value
 */
export function NumberComparer(x: number, y: number) {
    return x - y
}

// ############
// ## Tuples ##
// ############

/**
 * Creates a tuple.
 * @param X first value
 * @param Y second value
 */
export function AsTuple<X, Y>(first: X, second: Y): ITuple<X, Y> {
    return { first, second }
}

// ###################
// ## Error Classes ##
// ###################

/**
 * Common Error Strings
 */
export const ErrorString = Object.freeze({
    MoreThanOneElement: `Sequence contains more than one element`,
    MoreThanOneMatchingElement: `Sequence contains more than one matching element`,
    NoElements: `Sequence contains no elements`,
    NoMatch: `Sequence contains no matching element`,
})

/**
 * Invalid Operation Exception
 */
export class InvalidOperationException extends Error {
    constructor(public message: string) {
        super(message)
        this.name = `InvalidOperationException`
        this.stack = this.stack || (new Error()).stack
    }
}

/**
 * Exception thrown when the passed in argument
 * is out of range.
 */
export class ArgumentOutOfRangeException extends RangeError {
    constructor(public readonly paramName: string) {
        super(`${ paramName } was out of range.` +
            ` Must be non-negative and less than the size of the collection.`)
        this.name = `ArgumentOutOfRangeException`
        this.stack = this.stack || (new Error()).stack
    }
}
