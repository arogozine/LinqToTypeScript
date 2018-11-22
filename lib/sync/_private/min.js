"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
function min(source, selector) {
    if (selector) {
        return min_2(source, selector);
    }
    else {
        return min_1(source);
    }
}
exports.min = min;
function min_1(source) {
    let minItem = null;
    for (const item of source) {
        minItem = Math.min(minItem || Number.POSITIVE_INFINITY, item);
    }
    if (minItem === null) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    else {
        return minItem;
    }
}
function min_2(source, selector) {
    let minItem = null;
    for (const item of source) {
        minItem = Math.min(minItem || Number.POSITIVE_INFINITY, selector(item));
    }
    if (minItem === null) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    else {
        return minItem;
    }
}
