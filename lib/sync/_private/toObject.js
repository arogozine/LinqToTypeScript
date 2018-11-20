"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toObject(source, selector) {
    const map = {};
    for (const value of source) {
        map[selector(value)] = value;
    }
    return map;
}
exports.toObject = toObject;
