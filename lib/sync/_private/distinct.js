"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
const BasicEnumerable_1 = require("../BasicEnumerable");
function distinct(source, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
    function* iterator() {
        const distinctElements = [];
        for (const item of source) {
            const foundItem = distinctElements.find((x) => comparer(x, item));
            if (!foundItem) {
                distinctElements.push(item);
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.distinct = distinct;
