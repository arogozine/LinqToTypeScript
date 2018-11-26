"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Does weak (==) comparison between two values.
 * Good for comparing numbers and strings.
 * @param x left value
 * @param y right value
 */
exports.EqualityComparer = (x, y) => 
// tslint:disable-next-line:triple-equals
x == y;
