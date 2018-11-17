"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
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
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
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
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    else {
        return minItem;
    }
}
