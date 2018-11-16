"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
const BasicEnumerable_1 = require("../BasicEnumerable");
const groupByShared_1 = require("./groupByShared");
function groupByWithResult(source, keySelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy_2(source, keySelector, resultSelector, comparer);
    }
    else {
        return groupBy_2_Simple(source, keySelector, resultSelector);
    }
}
exports.groupByWithResult = groupByWithResult;
function groupBy_2_Simple(source, keySelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_0_Simple(source, keySelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_2_Simple = groupBy_2_Simple;
function groupBy_2(source, keySelector, resultSelector, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_0(source, keySelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_2 = groupBy_2;
