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
// tslint:enable:ordered-imports

describe("intersect", () => {
    itEnumerable<string | number>("IntersectWithEqualityComparer", (asEnumerable) => {
        const array = asEnumerable([1, 2, "3"]).intersect(asEnumerable(["1", "2"]), EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparerAsync", async () => {
        const array = await asAsync([1, 2, "3"])
            .intersect(asAsync<string | number>(["1", "2"]), EqualityComparer)
            .toArray()

        expect(array).toEqual([1, 2])
    })
})

describe("joinByKey", () => {
    itEnumerable<number>("basic", (asEnumerable) => {
        const joinBy = asEnumerable([1, 2, 3]).joinByKey(asEnumerable([1, 2, 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ))
            .toArray()

        expect(joinBy.length).toBe(3)
        expect(joinBy[0].x).toBe(1)
        expect(joinBy[1].x).toBe(2)
        expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x).toBe(joinBy[0].y)
        expect(joinBy[1].x).toBe(joinBy[1].y)
        expect(joinBy[2].x).toBe(joinBy[2].y)
    })

    itAsync("BasicAsync", async () => {
        const joinBy = await asAsync([1, 2, 3]).joinByKey(asAsync([1, 2, 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ))
            .toArray()

        expect(joinBy.length).toBe(3)
        expect(joinBy[0].x).toBe(1)
        expect(joinBy[1].x).toBe(2)
        expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x).toBe(joinBy[0].y)
        expect(joinBy[1].x).toBe(joinBy[1].y)
        expect(joinBy[2].x).toBe(joinBy[2].y)
    })

    // TODO: Comparer
})

describe("take", () => {
    itEnumerable("Take", (asEnumerable) => {
        const array = asEnumerable([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("TakeAsync", async () => {
        const array = await asAsync([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    const vals = [1, 2, 3, 4]
    const valsAsync = asAsync(vals)

    itEnumerable("various positive amounts", (asEnumerable) => {
        expect(asEnumerable(vals).take(4).toArray()).toEqual(vals)
        expect(asEnumerable(vals).take(1).toArray()).toEqual([1])
        expect(asEnumerable(vals).take(2).toArray()).toEqual([1, 2])
    })

    itAsync("various positive amounts async", async () => {
        expect(await valsAsync.take(4).toArray()).toEqual(vals)
        expect(await valsAsync.take(1).toArray()).toEqual([1])
        expect(await valsAsync.take(2).toArray()).toEqual([1, 2])
    })

    itEnumerable("zero elements", (asEnumerable) =>
        expect(asEnumerable(vals).take(0).toArray()).toEqual([]))

    itAsync("zero elements async", async () =>
        expect(await valsAsync.take(0).toArray()).toEqual([]))

    itEnumerable("negative amount", (asEnumerable) =>
        expect(asEnumerable(vals).take(-1).toArray()).toEqual([]))

    itAsync("negative amount async", async () =>
        expect(await valsAsync.take(-1).toArray()).toEqual([]))
})

describe("takeWhile", () => {
    const vals = [1, 2, 3, 4]

    itEnumerable("by value", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((x) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((x) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itEnumerable("by value and index", (asEnumerable) => {
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })

    const valsAsync = asAsync([1, 2, 3, 4])

    itAsync("by value async", async () => {
        expect(await valsAsync.takeWhile((x) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((x) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    itAsync("by value and index async", async () => {
        expect(await valsAsync.takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(await valsAsync.takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(await valsAsync.takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })
})

describe("toArray", () => {
    itEnumerable("toArray", (asEnumerable) => {
        const array1 = asEnumerable([1, 2, 3])
        const array2 = array1.toArray()
        expect(array2.length).toBe(array1.count())
        expect(array1 as any === array2 as any).toBe(false)
        expect(array1.toArray()).toEqual(array2)
    })

    itAsync("toArrayAsync", async () => {
        const array1 = [1, 2, 3]
        const array2 = await asAsync(array1).toArray()
        expect(array2.length).toBe(array1.length)
        expect(array1 === array2).toBe(false)
        expect(array1).toEqual(array2)
    })

    itAsync("toArrayParallel", async () => {
        const array1 = [1, 2, 3]
        const array2 = await asParallel(array1).toArray()
        expect(array2.length).toBe(array1.length)
        expect(array1 === array2).toBe(false)
        expect(array1).toEqual(array2)
    })
})

describe("toMap", () => {
    itEnumerable("toMap", (asEnumerable) => {
        const map = asEnumerable([1, 2, 3]).toMap((x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })

    itAsync("toMapAsync", async () => {
        const map = await asAsync([1, 2, 3]).toMap((x) => `Key_${ x }`)
        for (const keyValue of map) {
            const key = keyValue[0]
            const value = keyValue[1]
            expect(key).toBe(`Key_${ value[0] }`)
        }
    })
})

describe("toSet", () => {
    itEnumerable("toSet", (asEnumerable) => {
        const set = asEnumerable([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })

    itAsync("toSetAsync", async () => {
        const set = await asAsync([1, 2, 3]).toSet()
        expect(set instanceof Set).toBe(true)
        expect(set.has(1)).toBe(true)
        expect(set.has(2)).toBe(true)
        expect(set.has(3)).toBe(true)
        expect(set.size).toBe(3)
    })
})

describe("last", () => {
    itEnumerable("Last", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last()).toBe(2)
    })

    itAsync("LastAsync", async () => {
        expect(await asAsync([1, 2]).last()).toBe(2)
    })

    itEnumerable("LastEmpty", (asEnumerable) => {
        expect(() => asEnumerable([]).last()).toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyAsync", async () => {
        const expect = await expectAsync(asAsync([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("LastPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).last((x) => x === 1)).toBe(1)
    })
})

describe("lastOrDefault", () => {
    itEnumerable("LastOrDefault", (asEnumerable) => {
        expect(asEnumerable([]).lastOrDefault()).toBeNull()
    })

    itAsync("LastOrDefaultAsync", async () => {
        expect(await asAsync([]).lastOrDefault()).toBeNull()
    })

    itEnumerable("LastOrDefaultPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
    })

    itAsync("LastOrDefaultPredicateAsync", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
    })
})

describe("max", () => {
    itEnumerable("MaxSelectEmptyError", (asEnumerable) => {
        expect(() => asEnumerable([] as number[]).max((x) => x * x))
            .toThrowError(InvalidOperationException)
    })

    itAsync("MaxSelectEmptyError", async () => {
        const value = await expectAsync(asAsync([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("MaxSelect", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itAsync("MaxSelectAsync", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itEnumerable("Basic", (asEnumerable) => expect(asEnumerable([1, 2, 3]).max()).toBe(3))

    itAsync("BasicAsync", async () => expect(await asAsync([1, 2, 3]).max()).toBe(3))

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).max()).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception async", async () => {
        const value = await expectAsync(asAsync([]).max())
        value.toThrowError(InvalidOperationException)
    })

    itEnumerable("max with selector", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).max((x) => x * 2)).toBe(6))

    itAsync("max with selector async", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    itEnumerable("empty array throws exception with selector", (asEnumerable) =>
        expect(() => asEnumerable([]).max((x) => x * 2)).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception with selector async", async () => {
        const expect = await expectAsync(asAsync([] as number[]).max((x) => x * 2))
        expect.toThrowError(InvalidOperationException)
    })
})

describe("min", () => {
    itEnumerable("Min", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3, -7]).min()).toBe(-7)
    })

    itAsync("MinAsync", async () => {
        expect(await asAsync([1, 2, 3, -7]).min()).toBe(-7)
    })

    itEnumerable("MinEmptyError", (asEnumerable) => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("MinEmptyErrorAsync", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("MinPredicate Empty Error", (asEnumerable) => {
        expect(() => asEnumerable([] as number[]).min((x) => x * x)).toThrowError(InvalidOperationException)
    })

    itAsync("MinPredicate Empty Error Async", async () => {
        const expectMin = await expectAsync(asAsync([] as number[]).min((x) => x * x))
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("Min Predicate", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3, -7]).min(Math.abs)).toBe(1)
    })

    itAsync("Min Predicate Async", async () => {
        const expectMin = await expectAsync(asAsync([1, 2, 3, -7]).min(Math.abs))
        expectMin.toBe(1)
    })

    itEnumerable("empty exception", (asEnumerable) => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("empty exception async", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    itEnumerable("empty exception with selector", (asEnumerable) => {
        expect(() => asEnumerable([]).min((x) => x)).toThrowError(InvalidOperationException)
    })

    itAsync("empty exception with selector async", async () => {
        const expectMin = await expectAsync(asAsync([]).min((x) => x))
        expectMin.toThrowError(InvalidOperationException)
    })
})

describe("ofType", () => {
    // tslint:disable-next-line:no-construct
    const array = ["str", "str2", 1, 2, 3, {}, true, new Number(1)]

    itEnumerable<any>("string", (asEnumerable) => {
        expect(asEnumerable(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itAsync("stringAsync", async () => {
        expect(await asAsync(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itEnumerable<any>("number", (asEnumerable) => {
        expect(asEnumerable(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    it("numberAsync", async () => {
        expect(await asAsync(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    itEnumerable<any>("object", (asEnumerable) => {
        // tslint:disable-next-line:no-construct
        expect(asEnumerable(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itAsync("objectAsync", async () => {
        // tslint:disable-next-line:no-construct
        expect(await asAsync(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itEnumerable<any>("boolean", (asEnumerable) => {
        expect(asEnumerable(array).ofType("boolean").toArray()).toEqual([true])
    })

    itAsync("booleanAsync", async () => {
        expect(await asAsync(array).ofType("boolean").toArray()).toEqual([true])
    })

    itEnumerable<any>("Number (Object)", (asEnumerable) => {
        expect(asEnumerable(array).ofType(Number).toArray()).toEqual([Number(1)])
    })

    itAsync("Number (Object) Async", async () => {
        expect(await asAsync(array).ofType(Number).toArray()).toEqual([Number(1)])
    })
})

describe("orderBy", () => {
    itEnumerable<string>("string", (asEnumerable) => {
        const vals = asEnumerable(["b", "c", "a"]).orderBy((x) => x).toArray()

        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.orderBy((x) => x).toArray()).toEqual(vals.toArray())
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderBy((x) => x).toArray()).toEqual(await vals.toArray())
    })
})

describe("orderByDescending", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.orderByDescending((x) => x).toArray()).toEqual(vals.reverse().toArray())
    })

    itAsync("BasicAsync", async () => {
        const vals = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderByDescending((x) => x).toArray())
            .toEqual(await vals.reverse().toArray())
    })
})

describe("reverse", () => {
    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3])
        expect(vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3])
        expect(await vals.reverse().toArray()).toEqual([3, 2, 1])
    })

    it("empty array still empty", () =>
        expect([].reverse()).toEqual([]))

    itAsync("empty array still empty async", async () =>
        expect(await asAsync([]).reverse().toArray()).toEqual([]))
})

describe("select", () => {
    itEnumerable<string>("select parseInt", (asEnumerable) => {
        expect(asEnumerable(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itAsync("select parseInt", async () => {
        expect(await asAsync(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itEnumerable<string>("select length", (asEnumerable) => {
        expect(asEnumerable(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itAsync("select length", async () => {
        expect(await asAsync(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })
})

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
