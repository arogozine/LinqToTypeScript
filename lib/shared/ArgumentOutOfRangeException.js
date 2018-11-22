"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
