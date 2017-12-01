"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("./sync/sync");
var shared_1 = require("./shared/shared");
exports.StrictEqualityComparer = shared_1.StrictEqualityComparer;
exports.EqualityComparer = shared_1.EqualityComparer;
exports.StringifyComparer = shared_1.StringifyComparer;
exports.NumberComparer = shared_1.NumberComparer;
exports.AsTuple = shared_1.AsTuple;
exports.InvalidOperationException = shared_1.InvalidOperationException;
exports.ArgumentOutOfRangeException = shared_1.ArgumentOutOfRangeException;
var sync_2 = require("./sync/sync");
exports.ArrayEnumerable = sync_2.ArrayEnumerable;
exports.Enumerable = sync_2.Enumerable;
var async_1 = require("./async/async");
exports.AsyncEnumerable = async_1.AsyncEnumerable;
var parallel_1 = require("./parallel/parallel");
exports.ParallelEnumerable = parallel_1.ParallelEnumerable;
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.BaseEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || sync_1.BaseEnumerable.prototype[prop];
    }
}
exports.bindLinq = bindLinq;
function bindArray(object) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || sync_1.ArrayEnumerable.prototype[prop];
    }
}
exports.bindArray = bindArray;
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
