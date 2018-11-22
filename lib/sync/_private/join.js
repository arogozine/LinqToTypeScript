"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
const BasicEnumerable_1 = require("../BasicEnumerable");
function join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = StrictEqualityComparer_1.StrictEqualityComparer) {
    function* iterator() {
        const innerArray = [...inner];
        for (const o of outer) {
            const outerKey = outerKeySelector(o);
            for (const i of innerArray) {
                const innerKey = innerKeySelector(i);
                if (comparer(outerKey, innerKey) === true) {
                    yield resultSelector(o, i);
                }
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.join = join;
