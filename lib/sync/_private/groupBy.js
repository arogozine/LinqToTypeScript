"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupByShared_1 = require("./groupByShared");
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return groupByShared_1.groupBy_0(source, keySelector, comparer);
    }
    else {
        return groupByShared_1.groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
