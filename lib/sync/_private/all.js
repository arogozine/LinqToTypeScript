"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function all(source, predicate) {
    for (const item of source) {
        if (predicate(item) === false) {
            return false;
        }
    }
    return true;
}
exports.all = all;
