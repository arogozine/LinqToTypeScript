"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
function last(source, predicate) {
    if (predicate) {
        return last_2(source, predicate);
    }
    else {
        return last_1(source);
    }
}
exports.last = last;
function last_1(source) {
    let lastItem;
    for (const value of source) {
        lastItem = value;
    }
    if (!lastItem) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
    }
    return lastItem;
}
function last_2(source, predicate) {
    let lastItem;
    for (const value of source) {
        if (predicate(value) === true) {
            lastItem = value;
        }
    }
    if (!lastItem) {
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
    }
    return lastItem;
}
