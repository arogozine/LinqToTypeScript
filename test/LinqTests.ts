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
import "./tests/AsyncEnumerableIteration"
import "./tests/EnumerateObject"
import "./tests/Flatten"
import "./tests/FromEvent"
import "./tests/ParallelEnumerable"

import "./tests/Aggregate"
import "./tests/All"
import "./tests/Any"
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
import "./tests/LastOrDefault"
import "./tests/Max"
import "./tests/Min"
import "./tests/OfType"
import "./tests/OrderBy"
import "./tests/OrderByDescending"
import "./tests/Reverse"
import "./tests/Select"
import "./tests/Take"
import "./tests/TakeWhile"
import "./tests/ToArray"
import "./tests/ToMap"
import "./tests/ToSet"
// tslint:enable:ordered-imports

describe("selectMany", () => {
    itEnumerable<{ a: number[] }>("selectMany basic", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itEnumerable<{ a: number[] }>("selectMany string", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany basic async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany string async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ] as Array<{ a: Iterable<number> }>)

        expect(await values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

})

describe("single", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single()).toBe(1)
    })

    itAsync("basic async", async () => {
        const vals = asAsync([1])
        expect(await vals.single()).toBe(1)
    })

    itEnumerable("basic expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single()).toThrowError(InvalidOperationException)
    })

    itAsync("basic expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.single((x) => true)).toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.single((x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((x) => true)).toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.single((x) => false)).toThrowError(InvalidOperationException)
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => false))
        expect.toThrowError(InvalidOperationException)
    })
})

describe("singleOrDefault", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault()).toBe(1)
    })

    itAsync("basic async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault()).toBe(1)
    })

    itEnumerable("empty", (asEnumerable) => {
        const vals = asEnumerable([])
        expect(vals.singleOrDefault()).toBeNull()
    })

    itAsync("empty async", async () => {
        const vals = asAsync([])
        expect(await vals.singleOrDefault()).toBeNull()
    })

    itEnumerable("basic expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault()).toThrowError(InvalidOperationException)
    })

    itAsync("basic expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.singleOrDefault())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate", (asEnumerable) => {
        const vals = asEnumerable([1])
        expect(vals.singleOrDefault((x) => true)).toBe(1)
    })

    itAsync("predicate async", async () => {
        const vals = asAsync([1])
        expect(await vals.singleOrDefault((x) => true)).toBe(1)
    })

    itEnumerable("predicate multiple expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(() => vals.singleOrDefault((x) => true)).toThrowError(InvalidOperationException)
    })

    itEnumerable("predicate no matches expection", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4])
        expect(vals.singleOrDefault((x) => false)).toBeNull()
    })

    itAsync("predicate multiple expection async", async () => {
        const vals = asAsync([1, 2, 3, 4])
        const expect = await expectAsync(vals.single((x) => true))
        expect.toThrowError(InvalidOperationException)
    })

    itAsync("predicate no matches null", async () => {
        const vals = asAsync([1, 2, 3, 4])
        expect(await vals.singleOrDefault((x) => false)).toBeNull()
    })
})

describe("skip", () => {
    const vals = [1, 2, 3, 4]
    const valsAsync = asAsync(vals)

    itEnumerable("first element", (asEnumerable) =>
        expect(asEnumerable(vals).skip(1).toArray()).toEqual([2, 3, 4]))

    itAsync("first element async", async () =>
        expect(await valsAsync.skip(1).toArray()).toEqual([2, 3, 4]))

    itEnumerable("first two elements", (asEnumerable) =>
        expect(asEnumerable(vals).skip(0).toArray()).toEqual(vals))

    itAsync("first two elements async", async () =>
        expect(await valsAsync.skip(0).toArray()).toEqual(vals))

    itEnumerable("negative value", (asEnumerable) =>
        expect(asEnumerable(vals).skip(-9).toArray()).toEqual(vals))

    itAsync("negative value async", async () =>
        expect(await valsAsync.skip(-9).toArray()).toEqual(vals))
})

describe("sum", () => {
    itEnumerable("sum basic", (asEnumerable) => {
        expect(asEnumerable([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itAsync("sum basic async", async () => {
        expect(await asAsync([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itEnumerable<{ a: number }>("sum Selector", (asEnumerable) => {
        const zooms = asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(zooms.sum((x) => x.a)).toBe(6)
    })

    itAsync("sum Selector Async", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })
})

describe("union", () => {
    itEnumerable("=== union", (asEnumerable) => {
        const ints1 = asEnumerable([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asEnumerable([ 8, 3, 6, 4, 4, 9, 1, 0 ])
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    itAsync("=== union async", async () => {
        const ints1 = asAsync([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asAsync([ 8, 3, 6, 4, 4, 9, 1, 0 ])
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = await ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    itEnumerable<string|number>("== union", (asEnumerable) => {
        const ints1 = asEnumerable([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asEnumerable([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })

    itAsync("== union async", async () => {
        const ints1 = asAsync<string | number>([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asAsync<string | number>([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })
})

describe("where", () => {
    itEnumerable("item predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itAsync("item predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itEnumerable("item and index predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itAsync("item and index predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itEnumerable<string>("where basic", (asEnumerable) => {
        const stuff = asEnumerable([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = stuff
            .where((x: string, i: number) => i !== stuff.count() - 1)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })

    itAsync("where basic async", async () => {
        const stuff = asAsync([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = await stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = await stuff
            .where((x: string, i: number) => i !== 4)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })
})

describe("zip", () => {
    itEnumerable<string | number>("zip basic", (asEnumerable) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = asEnumerable(it1).zip(asEnumerable(it2)).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.first).toBe(first)
            expect(val.second).toBe(second)
        }
    })

    itAsync("zip basic async", async () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asAsync(it1)
        const it2Async = asAsync(it2)

        const zip = await it1Async.zip(it2Async).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.first).toBe(first)
            expect(val.second).toBe(second)
        }
    })

    itEnumerable("zip selector", (asEnumerable) => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = asEnumerable(it1).zip(it2, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })

    itAsync("zip selector Async", async () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const it1Async = asAsync(it1)
        const it2Async = asAsync(it2)

        const zip = await it1Async.zip(it2Async, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })
})
