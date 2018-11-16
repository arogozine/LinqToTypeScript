"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Empty Enumerable
 */
function empty() {
    const iterator = function* () {
        for (const x of []) {
            yield x;
        }
    };
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.empty = empty;
