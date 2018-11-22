"use strict";
// ########################
// ## Equality Comparers ##
// ########################
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Does strict (===) comparison between two values.
 * @param x left value
 * @param y right value
 */
function StrictEqualityComparer(x, y) {
    return x === y;
}
exports.StrictEqualityComparer = StrictEqualityComparer;
/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
function EqualityComparer(x, y) {
    /* tslint:disable */
    return x == y;
    /* tslint:enable */
}
exports.EqualityComparer = EqualityComparer;
/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
function StringifyComparer(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
}
exports.StringifyComparer = StringifyComparer;
// #####################
// ## Order Comparers ##
// #####################
/**
 * Compares two numeric values.
 * @param x left value
 * @param y right value
 */
function NumberComparer(x, y) {
    return x - y;
}
exports.NumberComparer = NumberComparer;
// ############
// ## Tuples ##
// ############
// ###################
// ## Error Classes ##
// ###################
/**
 * Common Error Strings
 */
exports.ErrorString = Object.freeze({
    MoreThanOneElement: `Sequence contains more than one element`,
    MoreThanOneMatchingElement: `Sequence contains more than one matching element`,
    NoElements: `Sequence contains no elements`,
    NoMatch: `Sequence contains no matching element`,
});
/**
 * Invalid Operation Exception
 */
class InvalidOperationException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = `InvalidOperationException`;
        this.stack = this.stack || (new Error()).stack;
    }
}
exports.InvalidOperationException = InvalidOperationException;
/**
 * Exception thrown when the passed in argument
 * is out of range.
 */
class ArgumentOutOfRangeException extends RangeError {
    constructor(paramName) {
        super(`${paramName} was out of range.` +
            ` Must be non-negative and less than the size of the collection.`);
        this.paramName = paramName;
        this.name = `ArgumentOutOfRangeException`;
        this.stack = this.stack || (new Error()).stack;
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
