"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Iterates through the object
 * @param source Source Object
 */
function enumerateObject(source) {
    function* iterable() {
        // tslint:disable-next-line:forin
        for (const key in source) {
            yield [key, source[key]];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterable);
}
exports.enumerateObject = enumerateObject;
