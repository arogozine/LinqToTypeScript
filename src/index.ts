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

import { ArrayEnumerable } from "./sync/sync"

import { BaseEnumerable } from "./sync/BaseEnumerable"
import { BasicEnumerable } from "./sync/BasicEnumerable"

import { BasicAsyncEnumerable } from "./async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "./parallel/BasicParallelEnumerable"
import { IAsyncEnumerable, IEnumerable, IParallelEnumerable, IPrototype } from "./types"

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
 * Determine if a source is a IEnumerable
 * @param source Any Value
 */
export function isEnumerable(source: any): source is IEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicEnumerable) {
        return true
    }

    if (source instanceof ArrayEnumerable) {
        return true
    }

    if (!(source[Symbol.iterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
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
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void {

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        object.prototype[prop] =  object.prototype[prop] || (BaseEnumerable.prototype as any)[prop]
    }
}

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<T, Y>): void {
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        jsArray.prototype[prop] =  jsArray.prototype[prop] || (ArrayEnumerable.prototype as any)[prop]
    }
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
