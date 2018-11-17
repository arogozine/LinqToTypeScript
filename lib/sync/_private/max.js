"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
function max(source, selector) {
    if (selector) {
        return max_2(source, selector);
    }
    else {
        return max_1(source);
    }
}
exports.max = max;
function max_1(source) {
    let maxItem = null;
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, item);
    }
    if (maxItem === null) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    else {
        return maxItem;
    }
}
function max_2(source, selector) {
    let maxItem = null;
    for (const item of source) {
        maxItem = Math.max(maxItem || Number.NEGATIVE_INFINITY, selector(item));
    }
    if (maxItem === null) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    else {
        return maxItem;
    }
}
