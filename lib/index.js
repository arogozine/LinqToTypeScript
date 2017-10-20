"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable_1 = require("./Enumerable");
const LinqForArray_1 = require("./LinqForArray");
var TypesAndHelpers_1 = require("./TypesAndHelpers");
exports.StrictEqualityComparer = TypesAndHelpers_1.StrictEqualityComparer;
exports.EqualityComparer = TypesAndHelpers_1.EqualityComparer;
exports.StringifyComparer = TypesAndHelpers_1.StringifyComparer;
exports.NumberComparer = TypesAndHelpers_1.NumberComparer;
exports.AsTuple = TypesAndHelpers_1.AsTuple;
exports.InvalidOperationException = TypesAndHelpers_1.InvalidOperationException;
exports.ArgumentOutOfRangeException = TypesAndHelpers_1.ArgumentOutOfRangeException;
exports.ArrayIterator = TypesAndHelpers_1.ArrayIterator;
var Enumerable_2 = require("./Enumerable");
exports.ArrayEnumerable = Enumerable_2.ArrayEnumerable;
exports.BasicEnumerable = Enumerable_2.BasicEnumerable;
exports.Enumerable = Enumerable_2.Enumerable;
var AsyncEnumerable_1 = require("./AsyncEnumerable");
exports.AsyncEnumerable = AsyncEnumerable_1.AsyncEnumerable;
var LinqForArray_2 = require("./LinqForArray");
exports.bindArray = LinqForArray_2.bindArray;
exports.bindAllArrayTypes = LinqForArray_2.bindAllArrayTypes;
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(Enumerable_1.BaseEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || Enumerable_1.BaseEnumerable.prototype[prop];
    }
}
exports.bindLinq = bindLinq;
function initializeLinq() {
    bindLinq(Array);
    bindLinq(Map);
    bindLinq(Set);
    bindLinq(String);
    bindLinq(Int8Array);
    bindLinq(Int16Array);
    bindLinq(Int32Array);
    bindLinq(Uint8Array);
    bindLinq(Uint8ClampedArray);
    bindLinq(Uint16Array);
    bindLinq(Uint32Array);
    bindLinq(Float32Array);
    bindLinq(Float64Array);
    LinqForArray_1.bindAllArrayTypes();
}
exports.initializeLinq = initializeLinq;
