"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
function average(source, selector) {
    if (selector) {
        return average_2(source, selector);
    }
    else {
        return average_1(source);
    }
}
exports.average = average;
function average_1(source) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + item;
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    return value / count;
}
function average_2(source, func) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + func(item);
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    return value / count;
}
