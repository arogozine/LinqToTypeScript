"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
function sequenceEquals(first, second, comparer = StrictEqualityComparer_1.StrictEqualityComparer) {
    const firstIterator = first[Symbol.iterator]();
    const secondIterator = second[Symbol.iterator]();
    let firstResult = firstIterator.next();
    let secondResult = secondIterator.next();
    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false;
        }
        firstResult = firstIterator.next();
        secondResult = secondIterator.next();
    }
    return firstResult.done && secondResult.done;
}
exports.sequenceEquals = sequenceEquals;
