"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable_1 = require("./Enumerable");
var TypesAndHelpers_1 = require("./TypesAndHelpers");
exports.StrictEqualityComparer = TypesAndHelpers_1.StrictEqualityComparer;
exports.EqualityComparer = TypesAndHelpers_1.EqualityComparer;
exports.StringifyComparer = TypesAndHelpers_1.StringifyComparer;
exports.NumberComparer = TypesAndHelpers_1.NumberComparer;
exports.AsTuple = TypesAndHelpers_1.AsTuple;
exports.InvalidOperationException = TypesAndHelpers_1.InvalidOperationException;
exports.ArgumentOutOfRangeException = TypesAndHelpers_1.ArgumentOutOfRangeException;
var Enumerable_2 = require("./Enumerable");
exports.ArrayEnumerable = Enumerable_2.ArrayEnumerable;
exports.BasicEnumerable = Enumerable_2.BasicEnumerable;
exports.Enumerable = Enumerable_2.Enumerable;
var AsyncEnumerable_1 = require("./AsyncEnumerable");
exports.AsyncEnumerable = AsyncEnumerable_1.AsyncEnumerable;
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(Enumerable_1.BaseEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || Enumerable_1.BaseEnumerable.prototype[prop];
    }
}
exports.bindLinq = bindLinq;
function bindArray(object) {
    const propertyNames = Object.getOwnPropertyNames(Enumerable_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || Enumerable_1.BaseEnumerable.prototype[prop];
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
