"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEnumerable_1 = require("./BaseEnumerable");
const BasicEnumerable_1 = require("./BasicEnumerable");
const sync_1 = require("./sync");
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable_1.BaseEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || BaseEnumerable_1.BaseEnumerable.prototype[prop];
    }
}
exports.bindLinq = bindLinq;
/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
function bindArray(jsArray) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        jsArray.prototype[prop] = jsArray.prototype[prop] || sync_1.ArrayEnumerable.prototype[prop];
    }
}
exports.bindArray = bindArray;
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
    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable_1.BaseEnumerable.prototype)
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
