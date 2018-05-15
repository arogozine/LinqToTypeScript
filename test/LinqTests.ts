import {
    ArgumentOutOfRangeException,
    ArrayEnumerable,
    AsyncEnumerable,
    Enumerable,
    EqualityComparer,
    ErrorString,
    IAsyncEnumerable,
    IEnumerable,
    initializeLinq,
    InvalidOperationException } from "./../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable } from "./TestHelpers"

initializeLinq()

// Tests use Jasmine framework,
// https://jasmine.github.io/2.0/introduction.html

// We want the description to be the function
// being tested

declare function describe(
    description: (keyof IEnumerable<any>) |
        (keyof typeof Enumerable) | (keyof typeof AsyncEnumerable) | "AsyncEnumerableIteration",
    specDefinitions: (this: never) => void): void

// Parallel Issues - Aggregate, Min, Max

import "./tests/staticmethods/Empty"
import "./tests/staticmethods/EnumerateObject"
import "./tests/staticmethods/Flatten"
import "./tests/staticmethods/FromEvent"

import "./tests/AsyncEnumerableIteration"
import "./tests/ParallelEnumerable"

import "./tests/Aggregate"
import "./tests/All"
import "./tests/AllAsync"
import "./tests/Any"
import "./tests/AnyAsync"
import "./tests/AsAsync"
import "./tests/AsParallel"
import "./tests/Average"
import "./tests/AverageAsync"
import "./tests/Concat"
import "./tests/Contains"
import "./tests/ContainsAsync"
import "./tests/Count"
import "./tests/CountAsync"
import "./tests/Distinct"
import "./tests/DistinctAsync"
import "./tests/Each"
import "./tests/EachAsync"
import "./tests/ElementAt"
import "./tests/ElementAtOrDefault"
import "./tests/Except"
import "./tests/ExceptAsync"
import "./tests/First"
import "./tests/FirstAsync"
import "./tests/FirstOrDefault"
import "./tests/FirstOrDefaultAsync"
import "./tests/GroupBy"
import "./tests/GroupByAsync"
import "./tests/GroupByWithSel"
import "./tests/Intersect"
import "./tests/IntersectAsync"
import "./tests/JoinByKey"
import "./tests/Last"
import "./tests/LastAsync"
import "./tests/LastOrDefault"
import "./tests/LastOrDefaultAsync"
import "./tests/Max"
import "./tests/MaxAsync"
import "./tests/Min"
import "./tests/MinAsync"
import "./tests/OfType"
import "./tests/OrderBy"
import "./tests/OrderByAsync"
import "./tests/OrderByDescending"
import "./tests/OrderByDescendingAsync"
import "./tests/Reverse"
import "./tests/Select"
import "./tests/SelectAsync"
import "./tests/SelectMany"
import "./tests/SelectManyAsync"
import "./tests/Single"
import "./tests/SingleAsync"
import "./tests/SingleOrDefault"
import "./tests/SingleOrDefaultAsync"
import "./tests/Skip"
import "./tests/SkipWhile"
import "./tests/SkipWhileAsync"
import "./tests/Sum"
import "./tests/SumAsync"
import "./tests/Take"
import "./tests/TakeWhile"
import "./tests/TakeWhileAsync"
import "./tests/ThenBy"
import "./tests/ThenByAsync"
import "./tests/ToArray"
import "./tests/ToMap"
import "./tests/ToMapAsync"
import "./tests/ToSet"
import "./tests/Union"
import "./tests/Where"
import "./tests/WhereAsync"
import "./tests/Zip"
import "./tests/ZipAsync"
// tslint:enable:ordered-imports
