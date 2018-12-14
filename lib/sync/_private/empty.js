"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Returns an empty IEnumerable<T> that has the specified type argument.
 * @returns An empty IEnumerable<T> whose type argument is TResult.
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
