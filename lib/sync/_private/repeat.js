"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IEnumerable<T> that contains a repeated value.
 */
function repeat(element, count) {
    if (count < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`count`);
    }
    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.repeat = repeat;
