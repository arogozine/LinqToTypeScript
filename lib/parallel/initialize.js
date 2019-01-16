"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
const bindLinqParallel_1 = require("./bindLinqParallel");
exports.initializeParallelTypes = () => {
    bindLinqParallel_1.bindLinqParallel(BasicParallelEnumerable_1.BasicParallelEnumerable);
};
