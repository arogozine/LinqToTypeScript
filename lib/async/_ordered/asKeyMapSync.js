"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Key Selector for Map
 * @returns Map for Key to Values
 */
exports.asKeyMapSync = (source, keySelector) => {
    const map = new Map();
    for (const item of source) {
        const key = keySelector(item);
        const currentMapping = map.get(key);
        if (currentMapping) {
            currentMapping.push(item);
        }
        else {
            map.set(key, [item]);
        }
    }
    return map;
};
