"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function any(source, predicate) {
    if (predicate) {
        return any_2(source, predicate);
    }
    else {
        return any_1(source);
    }
}
exports.any = any;
function any_1(source) {
    for (const _ of source) {
        return true;
    }
    return false;
}
function any_2(source, predicate) {
    for (const item of source) {
        if (predicate(item) === true) {
            return true;
        }
    }
    return false;
}
