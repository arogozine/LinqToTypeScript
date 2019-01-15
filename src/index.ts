// LINQ to TypeScript
// Copyright (c) Alexandre Rogozine
// MIT License
// https://github.com/arogozine/LinqToTypeScript/blob/master/LICENSE

// API design adapted from,

// LINQ: .NET Language-Integrated Query
// API is part of .NET Core foundational libraries (CoreFX)
// MIT License
// https://github.com/dotnet/corefx/blob/master/LICENSE.TXT

// API Documentation adapted from,

// LINQ API Documentation
// Create Commons Attribution 4.0 International
// https://github.com/dotnet/docs/blob/master/LICENSE

import { bindArray, bindLinq } from "./sync/sync"

import { BasicAsyncEnumerable } from "./async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "./parallel/BasicParallelEnumerable"
import { IAsyncEnumerable, IParallelEnumerable } from "./types"

import { BasicEnumerable } from "./sync/BasicEnumerable"

import { initializeAsyncTypes } from "./async/initialize"
import { initializeTypes } from "./sync/initialize"

initializeTypes()
initializeAsyncTypes()

// Shared Interfacess
export * from "./shared/shared"

// Enumerable
export * from "./sync/sync"

/**
 * Determine if the source is IParallelEnumerable
 * @param source Any value
 */
export function isParallelEnumerable(source: any): source is IParallelEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicParallelEnumerable) {
        return true
    }

    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicParallelEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}

/**
 * Determine if a type is IAsyncEnumerable
 * @param source Any Value
 */
export function isAsyncEnumerable(source: any): source is IAsyncEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicAsyncEnumerable) {
        return true
    }

    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}

/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export function initializeLinq() {
    bindArray(Array)
    bindLinq(Map)
    bindLinq(Set)
    bindLinq(String)

    bindArray(Int8Array)
    bindArray(Int16Array)
    bindArray(Int32Array)

    bindArray(Uint8Array)
    bindArray(Uint8ClampedArray)
    bindArray(Uint16Array)
    bindArray(Uint32Array)

    bindArray(Float32Array)
    bindArray(Float64Array)
}

bindLinq(BasicEnumerable)
