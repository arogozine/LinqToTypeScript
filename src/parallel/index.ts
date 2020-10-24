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

// Initializers First
export * from "./../initializer/initializer"

// Interfaces and Types
export * from "./../types"

// Shared Functions and Classes
export * from "../shared"

// Parallel Specific
export * from "./ParallelEnumerable"
export { isParallelEnumerable } from "./isParallelEnumerable"
