"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const BasicAsyncEnumerable_1 = require("./async/BasicAsyncEnumerable");
const BasicParallelEnumerable_1 = require("./parallel/BasicParallelEnumerable");
const BaseEnumerable_1 = require("./sync/BaseEnumerable");
const BasicEnumerable_1 = require("./sync/BasicEnumerable");
const sync_1 = require("./sync/sync");
// Shared Interfacess
__export(require("./shared/shared"));
// Enumerable
__export(require("./sync/sync"));
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
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
function initializeLinq() {
    bindArray(Array);
    bindLinq(Map);
    bindLinq(Set);
    bindLinq(String);
    bindArray(Int8Array);
    bindArray(Int16Array);
    bindArray(Int32Array);
    bindArray(Uint8Array);
    bindArray(Uint8ClampedArray);
    bindArray(Uint16Array);
    bindArray(Uint32Array);
    bindArray(Float32Array);
    bindArray(Float64Array);
}
exports.initializeLinq = initializeLinq;
