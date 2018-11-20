"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Reverses an Iterable
 * @param source Iterable
 */
function reverse(source) {
    function* iterator() {
        for (const x of [...source].reverse()) {
            yield x;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.reverse = reverse;
