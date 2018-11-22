"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Compares two values by converting them to json
 * and then comparing the two json strings.
 * @param x left value
 * @param y right value
 */
function StringifyComparer(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
}
exports.StringifyComparer = StringifyComparer;
