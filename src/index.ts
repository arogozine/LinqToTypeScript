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

// Shared Interfacess
export * from "./types"

// Types and Stuff
export * from "./shared"
export { ArrayEnumerable } from "./sync/ArrayEnumerable"
export * from "./initializer/initializer"
export { from } from "./sync/static/from"
export { fromAsync } from "./async/static/fromAsync"
export { fromParallel } from "./parallel/static/fromParallel"
export { isEnumerable } from "./sync/isEnumerable"
export { isParallelEnumerable } from "./parallel/isParallelEnumerable"
export { isAsyncEnumerable } from "./async/isAsyncEnumerable"
