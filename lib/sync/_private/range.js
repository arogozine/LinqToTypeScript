"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
function range(start, count) {
    if (start < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`start`);
    }
    function* iterator() {
        const max = start + count;
        for (let i = start; i < max; i++) {
            yield i;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.range = range;
