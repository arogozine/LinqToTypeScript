"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayEnumerable_1 = require("../sync/ArrayEnumerable");
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
