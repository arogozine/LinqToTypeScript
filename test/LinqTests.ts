import {
    AsyncEnumerable,
    Enumerable,
    IEnumerable,
    initializeLinq } from "./../src/index"

initializeLinq()

// Tests use Jasmine framework,
// https://jasmine.github.io/2.0/introduction.html

// We want the description to be the function
// being tested

const desc = describe

function describeWrapper(description: string, specDefinitions: () => void): void {
    const allowed = [
        "AsyncEnumerableIteration",
        "isAsyncEnumerable",
        "isEnumerable",
        "isParallelEnumerable",
        "ParallelEnumerable",
        "thenBy",
        "thenByAsync",
        "joinByKey",
    ]
    const syncKeys = Object.getOwnPropertyNames(Enumerable)
    const asyncKeys = Object.getOwnPropertyNames(AsyncEnumerable)
    const keys = [ ...syncKeys, ...asyncKeys, ...allowed ]

    if (keys.find((key) => key === description) === undefined) {
        // tslint:disable-next-line:no-console
        console.warn(`Describe - "${ description }"`)
    }

    desc(description, specDefinitions)
}

(window as any).describe = describeWrapper

import "./tests/staticmethods/Empty"
import "./tests/staticmethods/EnumerateObject"
import "./tests/staticmethods/Flatten"
import "./tests/staticmethods/FromEvent"
import "./tests/staticmethods/Range"
import "./tests/staticmethods/Repeat"

import "./tests/AsyncEnumerableIteration"
import "./tests/is/isAsyncEnumerable"
import "./tests/is/IsEnumerable"
import "./tests/is/isParallelEnumerable"
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
import "./tests/SequenceEquals"
import "./tests/SequenceEqualsAsync"
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

import "./tests/parallel/each"
// tslint:enable:ordered-imports
