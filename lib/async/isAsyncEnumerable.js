"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
/**
 * Determine if a type is IAsyncEnumerable
 * @param source Any Value
 */
function isAsyncEnumerable(source) {
    if (!source) {
        return false;
    }
    if (source instanceof BasicAsyncEnumerable_1.BasicAsyncEnumerable) {
        return true;
    }
    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false;
    }
    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable_1.BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor");
    const methods = source.prototype || source;
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false;
        }
    }
    return true;
}
exports.isAsyncEnumerable = isAsyncEnumerable;
