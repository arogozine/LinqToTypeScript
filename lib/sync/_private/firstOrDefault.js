"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function firstOrDefault(source, predicate) {
    if (predicate) {
        return firstOrDefault_2(source, predicate);
    }
    else {
        return firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
function firstOrDefault_1(source) {
    const first = source[Symbol.iterator]().next();
    return first.value || null;
}
function firstOrDefault_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    return null;
}
