"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
function from(type, generator) {
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type,
    });
}
exports.from = from;
