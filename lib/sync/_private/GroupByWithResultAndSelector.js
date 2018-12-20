"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
const BasicEnumerable_1 = require("../BasicEnumerable");
const groupByShared_1 = require("./groupByShared");
function groupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy3(source, keySelector, elementSelector, resultSelector);
    }
    else {
        return groupBy3Simple(source, keySelector, elementSelector, resultSelector);
    }
}
exports.groupByWithResultAndSelector = groupByWithResultAndSelector;
const groupBy3Simple = (source, keySelector, elementSelector, resultSelector) => {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1_Simple(source, keySelector, elementSelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
const groupBy3 = (source, keySelector, elementSelector, resultSelector, comparer = StrictEqualityComparer_1.StrictEqualityComparer) => {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1(source, keySelector, elementSelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
