"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
const groupByShared_1 = require("./groupByShared");
function groupBy(source, keySelector, comparer) {
    let iterable;
    if (comparer) {
        iterable = groupByShared_1.groupBy_0(source, keySelector, comparer);
    }
    else {
        iterable = groupByShared_1.groupBy_0_Simple(source, keySelector);
    }
    return new BasicEnumerable_1.BasicEnumerable(iterable);
}
exports.groupBy = groupBy;
