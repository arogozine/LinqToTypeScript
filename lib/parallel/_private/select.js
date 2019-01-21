"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
const _nextIteration_1 = require("./_nextIteration");
const _nextIterationWithIndex_1 = require("./_nextIterationWithIndex");
function select(source, key) {
    if (typeof key === "function") {
        if (key.length === 1) {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, key));
        }
        else {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIterationWithIndex_1.nextIterationWithIndex(source, key));
        }
    }
    else {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, (x) => x[key]));
    }
}
exports.select = select;
