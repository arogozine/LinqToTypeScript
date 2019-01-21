"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
/**
 * Determine if the source is IParallelEnumerable
 * @param source Any value
 */
function isParallelEnumerable(source) {
    if (!source) {
        return false;
    }
    if (source instanceof BasicParallelEnumerable_1.BasicParallelEnumerable) {
        return true;
    }
    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false;
    }
    const propertyNames = Object.getOwnPropertyNames(BasicParallelEnumerable_1.BasicParallelEnumerable.prototype)
        .filter((v) => v !== "constructor");
    const methods = source.prototype || source;
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false;
        }
    }
    return true;
}
exports.isParallelEnumerable = isParallelEnumerable;
