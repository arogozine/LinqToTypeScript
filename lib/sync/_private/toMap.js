"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toMap(source, selector) {
    const map = new Map();
    for (const value of source) {
        const key = selector(value);
        const array = map.get(key);
        if (array === undefined) {
            map.set(key, [value]);
        }
        else {
            array.push(value);
        }
    }
    return map;
}
exports.toMap = toMap;
