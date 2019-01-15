"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
const bindLinqAsync_1 = require("./bindLinqAsync");
exports.initializeAsyncTypes = () => {
    bindLinqAsync_1.bindLinqAsync(BasicAsyncEnumerable_1.BasicAsyncEnumerable);
};
