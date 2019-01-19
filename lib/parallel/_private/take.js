"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param source The sequence to return elements from.
 * @param amount The number of elements to return.
 * @returns An IParallelEnumerable<T> that contains the specified number of elements
 * from the start of the input sequence.
 */
function take(source, amount) {
    const amountLeft = amount > 0 ? amount : 0;
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 1 /* ArrayOfPromises */:
            const generator1 = () => dataFunc.generator().splice(0, amountLeft);
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator1,
                type: 1 /* ArrayOfPromises */,
            });
        case 2 /* PromiseOfPromises */:
            const generator2 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator2,
                type: 2 /* PromiseOfPromises */,
            });
        case 0 /* PromiseToArray */:
        default:
            const generator3 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator3,
                type: 0 /* PromiseToArray */,
            });
    }
}
exports.take = take;
