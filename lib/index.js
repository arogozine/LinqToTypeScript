"use strict";
// LINQ to TypeScript
// Copyright (c) Alexandre Rogozine
// MIT License
// https://github.com/arogozine/LinqToTypeScript/blob/master/LICENSE
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// API design adapted from,
// LINQ: .NET Language-Integrated Query
// API is part of .NET Core foundational libraries (CoreFX)
// MIT License
// https://github.com/dotnet/corefx/blob/master/LICENSE.TXT
// API Documentation adapted from,
// LINQ API Documentation
// Create Commons Attribution 4.0 International
// https://github.com/dotnet/docs/blob/master/LICENSE
// Shared Interfacess
__export(require("./types"));
// Types and Stuff
__export(require("./shared/shared"));
__export(require("./sync/Enumerable"));
var ArrayEnumerable_1 = require("./sync/ArrayEnumerable");
exports.ArrayEnumerable = ArrayEnumerable_1.ArrayEnumerable;
__export(require("./initializer/initializer"));
var isEnumerable_1 = require("./sync/isEnumerable");
exports.isEnumerable = isEnumerable_1.isEnumerable;
var isParallelEnumerable_1 = require("./parallel/isParallelEnumerable");
exports.isParallelEnumerable = isParallelEnumerable_1.isParallelEnumerable;
var isAsyncEnumerable_1 = require("./async/isAsyncEnumerable");
exports.isAsyncEnumerable = isAsyncEnumerable_1.isAsyncEnumerable;
