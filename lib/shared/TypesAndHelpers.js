"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function StrictEqualityComparer(x, y) {
    return x === y;
}
exports.StrictEqualityComparer = StrictEqualityComparer;
function EqualityComparer(x, y) {
    return x == y;
}
exports.EqualityComparer = EqualityComparer;
function StringifyComparer(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
}
exports.StringifyComparer = StringifyComparer;
function NumberComparer(x, y) {
    return x - y;
}
exports.NumberComparer = NumberComparer;
function AsTuple(first, second) {
    return { first, second };
}
exports.AsTuple = AsTuple;
exports.ErrorString = Object.freeze({
    MoreThanOneElement: `Sequence contains more than one element`,
    MoreThanOneMatchingElement: `Sequence contains more than one matching element`,
    NoElements: `Sequence contains no elements`,
    NoMatch: `Sequence contains no matching element`,
});
class InvalidOperationException extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = `InvalidOperationException`;
        this.stack = this.stack || (new Error()).stack;
    }
}
exports.InvalidOperationException = InvalidOperationException;
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
