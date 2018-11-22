"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
function EqualityComparer(x, y) {
    /* tslint:disable */
    return x == y;
    /* tslint:enable */
}
exports.EqualityComparer = EqualityComparer;
