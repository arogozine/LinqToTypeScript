"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../../shared/shared");
function contains(source, value, comparer = shared_1.StrictEqualityComparer) {
    for (const item of source) {
        if (comparer(value, item)) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
