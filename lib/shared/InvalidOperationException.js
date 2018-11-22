"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
