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
import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "./TestHelpers"

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

// tslint:disable:ordered-imports
import "./tests/AsParallel"
import "./tests/AsyncEnumerableIteration"
import "./tests/EnumerateObject"
import "./tests/Flatten"
import "./tests/FromEvent"
import "./tests/ParallelEnumerable"

import "./tests/Aggregate"
import "./tests/All"
import "./tests/AllAsync"
import "./tests/Any"
import "./tests/AnyAsync"
import "./tests/Average"
import "./tests/Count"
import "./tests/Concat"
import "./tests/Contains"
import "./tests/Distinct"
import "./tests/ElementAt"
import "./tests/ElementAtOrDefault"
import "./tests/Except"
import "./tests/First"
import "./tests/GroupBy"
import "./tests/GroupByWithSel"
import "./tests/Intersect"
import "./tests/JoinByKey"
import "./tests/Last"
import "./tests/LastAsync"
import "./tests/LastOrDefault"
import "./tests/Max"
import "./tests/Min"
import "./tests/OfType"
import "./tests/OrderBy"
import "./tests/OrderByDescending"
import "./tests/Reverse"
import "./tests/Select"
import "./tests/SelectAsync"
import "./tests/SelectMany"
import "./tests/Single"
import "./tests/SingleOrDefault"
import "./tests/Skip"
import "./tests/Sum"
import "./tests/Take"
import "./tests/TakeWhile"
import "./tests/ThenByAsync"
import "./tests/ToArray"
import "./tests/ToMap"
import "./tests/ToSet"
import "./tests/Union"
import "./tests/Where"
import "./tests/WhereAsync"
import "./tests/Zip"
// tslint:enable:ordered-imports
