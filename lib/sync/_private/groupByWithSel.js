"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupByShared_1 = require("./groupByShared");
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return groupByShared_1.groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return groupByShared_1.groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
