"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function selectMany(source, selector) {
    if (typeof selector === "function") {
        if (selector.length === 1) {
            return selectMany1(source, selector);
        }
        else {
            return selectMany2(source, selector);
        }
    }
    else {
        return selectMany3(source, selector);
    }
}
exports.selectMany = selectMany;
const selectMany1 = (source, selector) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
const selectMany2 = (source, selector) => {
    function* iterator() {
        let index = 0;
        for (const value of source) {
            for (const selectorValue of selector(value, index)) {
                yield selectorValue;
            }
            index++;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
const selectMany3 = (source, selector) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
