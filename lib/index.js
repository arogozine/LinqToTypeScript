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
const sync_1 = require("./sync/sync");
const BasicAsyncEnumerable_1 = require("./async/BasicAsyncEnumerable");
const BasicParallelEnumerable_1 = require("./parallel/BasicParallelEnumerable");
const BasicEnumerable_1 = require("./sync/BasicEnumerable");
const initialize_1 = require("./async/initialize");
const initialize_2 = require("./sync/initialize");
initialize_2.initializeTypes();
initialize_1.initializeAsyncTypes();
// Shared Interfacess
__export(require("./shared/shared"));
// Enumerable
__export(require("./sync/sync"));
/**
 * Determine if the source is IParallelEnumerable
 * @param source Any value
 */
function isParallelEnumerable(source) {
    if (!source) {
        return false;
    }
    if (source instanceof BasicParallelEnumerable_1.BasicParallelEnumerable) {
        return true;
    }
    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false;
    }
    const propertyNames = Object.getOwnPropertyNames(BasicParallelEnumerable_1.BasicParallelEnumerable.prototype)
        .filter((v) => v !== "constructor");
    const methods = source.prototype || source;
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false;
        }
    }
    return true;
}
exports.isParallelEnumerable = isParallelEnumerable;
/**
 * Determine if a type is IAsyncEnumerable
 * @param source Any Value
 */
function isAsyncEnumerable(source) {
    if (!source) {
        return false;
    }
    if (source instanceof BasicAsyncEnumerable_1.BasicAsyncEnumerable) {
        return true;
    }
    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false;
    }
    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable_1.BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor");
    const methods = source.prototype || source;
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false;
        }
    }
    return true;
}
exports.isAsyncEnumerable = isAsyncEnumerable;
/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
function initializeLinq() {
    sync_1.bindArray(Array);
    sync_1.bindLinq(Map);
    sync_1.bindLinq(Set);
    sync_1.bindLinq(String);
    sync_1.bindArray(Int8Array);
    sync_1.bindArray(Int16Array);
    sync_1.bindArray(Int32Array);
    sync_1.bindArray(Uint8Array);
    sync_1.bindArray(Uint8ClampedArray);
    sync_1.bindArray(Uint16Array);
    sync_1.bindArray(Uint32Array);
    sync_1.bindArray(Float32Array);
    sync_1.bindArray(Float64Array);
}
exports.initializeLinq = initializeLinq;
sync_1.bindLinq(BasicEnumerable_1.BasicEnumerable);
