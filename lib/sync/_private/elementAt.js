"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
function elementAt(source, index) {
    if (index < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
    }
    let i = 0;
    for (const item of source) {
        if (index === i++) {
            return item;
        }
    }
    throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
}
exports.elementAt = elementAt;
