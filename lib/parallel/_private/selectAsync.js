"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
const _nextIterationAsync_1 = require("./_nextIterationAsync");
const _nextIterationWithIndexAsync_1 = require("./_nextIterationWithIndexAsync");
function selectAsync(source, keyOrSelector) {
    let generator;
    if (typeof keyOrSelector === "function") {
        if (keyOrSelector.length === 1) {
            generator = _nextIterationAsync_1.nextIterationAsync(source, keyOrSelector);
        }
        else {
            generator = _nextIterationWithIndexAsync_1.nextIterationWithIndexAsync(source, keyOrSelector);
        }
    }
    else {
        generator = _nextIterationAsync_1.nextIterationAsync(source, (x) => (x[keyOrSelector]));
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(generator);
}
exports.selectAsync = selectAsync;
