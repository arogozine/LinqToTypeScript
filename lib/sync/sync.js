"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayEnumerable_1 = require("./ArrayEnumerable");
exports.ArrayEnumerable = ArrayEnumerable_1.ArrayEnumerable;
const BaseEnumerable_1 = require("./BaseEnumerable");
__export(require("./Enumerable"));
var Grouping_1 = require("./Grouping");
exports.Grouping = Grouping_1.Grouping;
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
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        jsArray.prototype[prop] = jsArray.prototype[prop] || ArrayEnumerable_1.ArrayEnumerable.prototype[prop];
    }
}
exports.bindArray = bindArray;
