"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IParallelEnumerable<number> that contains a range of sequential integral numbers.
 */
function range(start, count) {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`start`);
    }
    function generator() {
        const items = [];
        const maxI = start + count;
        for (let i = start; i < maxI; i++) {
            items.push(Promise.resolve(i));
        }
        return items;
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 1 /* ArrayOfPromises */,
    });
}
exports.range = range;
