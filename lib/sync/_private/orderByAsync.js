"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedEnumerable_1 = require("../OrderedEnumerable");
function orderByAsync(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generateAsync(source, keySelector, true, comparer);
}
exports.orderByAsync = orderByAsync;
