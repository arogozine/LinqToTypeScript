"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function selectMany(source, selector) {
    if (typeof selector === "string") {
        return selectMany_2(source, selector);
    }
    else {
        return selectMany_1(source, selector);
    }
}
exports.selectMany = selectMany;
function selectMany_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function selectMany_2(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
