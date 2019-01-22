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
// Initializers First
__export(require("./../initializer/initializer"));
// Interfaces and Types
__export(require("./../types"));
// Shared Functions and Classes
__export(require("./../shared/shared"));
// Sync Specific
__export(require("./Enumerable"));
var ArrayEnumerable_1 = require("./ArrayEnumerable");
exports.ArrayEnumerable = ArrayEnumerable_1.ArrayEnumerable;
var isEnumerable_1 = require("./isEnumerable");
exports.isEnumerable = isEnumerable_1.isEnumerable;
