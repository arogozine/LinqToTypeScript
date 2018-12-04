"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
function concat(first, second) {
    function* iterator() {
        yield* first;
        yield* second;
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.concat = concat;
