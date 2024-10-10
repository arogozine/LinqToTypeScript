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

// Shared Interfaces
export type * from "./types"

// Types and Stuff
export * from "./shared"
export { ArrayEnumerable } from "./sync/ArrayEnumerable"
// Main Initializer
export * from "./initializer/initializer"
// Static Methods
export * from "./sync/static"
export * from "./async/static"
export * from "./parallel/static"
// Type Check
export { isEnumerable } from "./sync/isEnumerable"
export { isParallelEnumerable } from "./parallel/isParallelEnumerable"
export { isAsyncEnumerable } from "./async/isAsyncEnumerable"
