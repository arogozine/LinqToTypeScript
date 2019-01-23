"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Not Yet Supported By Anything
require("core-js/modules/es7.symbol.async-iterator");
const BasicAsyncEnumerable_1 = require("../async/BasicAsyncEnumerable");
const BasicParallelEnumerable_1 = require("../parallel/BasicParallelEnumerable");
const BasicEnumerable_1 = require("../sync/BasicEnumerable");
const bindArrayEnumerable_1 = require("./bindArrayEnumerable");
const bindLinq_1 = require("./bindLinq");
exports.bindLinq = bindLinq_1.bindLinq;
const bindLinqAsync_1 = require("./bindLinqAsync");
exports.bindLinqAsync = bindLinqAsync_1.bindLinqAsync;
const bindLinqParallel_1 = require("./bindLinqParallel");
bindArrayEnumerable_1.bindArrayEnumerable();
bindLinq_1.bindLinq(BasicEnumerable_1.BasicEnumerable);
bindLinqAsync_1.bindLinqAsync(BasicAsyncEnumerable_1.BasicAsyncEnumerable);
bindLinqParallel_1.bindLinqParallel(BasicParallelEnumerable_1.BasicParallelEnumerable);
var initializeLinq_1 = require("./initializeLinq");
exports.initializeLinq = initializeLinq_1.initializeLinq;
