"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ParallelEnumerable"));
var bindLinqParallel_1 = require("./bindLinqParallel");
exports.bindLinqParallel = bindLinqParallel_1.bindLinqParallel;
var isParallelEnumerable_1 = require("./isParallelEnumerable");
exports.isParallelEnumerable = isParallelEnumerable_1.isParallelEnumerable;
