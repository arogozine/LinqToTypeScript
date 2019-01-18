"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
const _nextIteration_1 = require("./_nextIteration");
/**
 * Performs a specified action on each element of the IParallelEnumerable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IParallelEnumerable<T> that executes the action lazily as you iterate.
 */
function each(source, action) {
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, (x) => {
        action(x);
        return x;
    }));
}
exports.each = each;
