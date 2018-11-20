"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedEnumerable_1 = require("../OrderedEnumerable");
function orderByDescending(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
