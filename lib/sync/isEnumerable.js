"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("./BasicEnumerable");
const sync_1 = require("./sync");
/**
 * Determine if a source is a IEnumerable
 * @param source Any Value
 */
function isEnumerable(source) {
    if (!source) {
        return false;
    }
    if (source instanceof BasicEnumerable_1.BasicEnumerable) {
        return true;
    }
    if (source instanceof sync_1.ArrayEnumerable) {
        return true;
    }
    if (!(source[Symbol.iterator] instanceof Function)) {
        return false;
    }
    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable_1.BasicEnumerable.prototype)
        .filter((v) => v !== "constructor");
    const methods = source.prototype || source;
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false;
        }
    }
    return true;
}
exports.isEnumerable = isEnumerable;
