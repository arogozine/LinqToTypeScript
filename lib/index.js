"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable_1 = require("./Enumerable");
require("./LinqForArray");
require("./LinqForMap");
require("./LinqForSet");
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
exports.Enumerable = Enumerable_2.Enumerable;
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(Enumerable_1.BasicEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || Enumerable_1.BasicEnumerable.prototype[prop];
    }
}
function initialize() {
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
}
exports.initialize = initialize;
