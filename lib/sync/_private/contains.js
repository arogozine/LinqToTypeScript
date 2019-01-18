"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
/**
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 */
function contains(source, value, comparer = StrictEqualityComparer_1.StrictEqualityComparer) {
    for (const item of source) {
        if (comparer(value, item)) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
