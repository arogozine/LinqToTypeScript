"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lastOrDefault(source, predicate) {
    if (predicate) {
        return lastOrDefault_2(source, predicate);
    }
    else {
        return lastOrDefault_1(source);
    }
}
exports.lastOrDefault = lastOrDefault;
function lastOrDefault_1(source) {
    let last = null;
    for (const value of source) {
        last = value;
    }
    return last;
}
function lastOrDefault_2(source, predicate) {
    let last = null;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    return last;
}
