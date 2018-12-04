"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 */
function take(source, amount) {
    function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0;
        for (const item of source) {
            if (amountLeft-- === 0) {
                break;
            }
            else {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.take = take;
