"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
const BasicEnumerable_1 = require("../BasicEnumerable");
const groupByShared_1 = require("./groupByShared");
function GroupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy_3(source, keySelector, elementSelector, resultSelector);
    }
    else {
        return groupBy_3_Simple(source, keySelector, elementSelector, resultSelector);
    }
}
exports.GroupByWithResultAndSelector = GroupByWithResultAndSelector;
function groupBy_3_Simple(source, keySelector, elementSelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1_Simple(source, keySelector, elementSelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function groupBy_3(source, keySelector, elementSelector, resultSelector, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1(source, keySelector, elementSelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
