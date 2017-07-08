import { IEnumerable } from "../src/Interfaces"
import {
    ArgumentOutOfRangeException,
    EqualityComparer,
    ErrorString,
    InvalidOperationException } from "../src/TypesAndHelpers"
import * as Linq from "./../src/index"
Linq.initialize()
// https://jasmine.github.io/2.0/introduction.html
import "jasmine"

declare function describe(description: keyof[Linq.Enumerable]|string, specDefinitions: (this: never) => void): void

describe("aggregate", () => {

    it("Basic", () => {
        const array = ["f", "o", "o"]

        expect(array.aggregate((x, y) => x + y)).toBe("foo")

        const sentence = "the quick brown fox jumps over the lazy dog"
        // Split the string into individual words.
        const words = sentence.split(" ")
        // Prepend each word to the beginning of the
        // new sentence to reverse the word order.
        const reversed = words.aggregate((workingSentence, next) =>
                                        next + " " + workingSentence)
        expect(reversed).toBe("dog lazy the over jumps fox brown quick the")
    })

    it("ResultSelector", () => {
        const fruits = [ "apple", "mango", "orange", "passionfruit", "grape" ]

        // Determine whether any string in the array is longer than "banana".
        const longestName = fruits.aggregate(
            "banana",
            (longest, next) => next.length > longest.length ? next : longest,
            // Return the final result as an upper case string.
            (fruit) => fruit.toUpperCase())

        expect(longestName).toBe("PASSIONFRUIT")
    })

    it("single value", () => {
        const val2 = [1].aggregate((x, y) => x + y)
        expect(val2).toBe(1)
    })

    it("multiple values", () => {
        const val = [1, 2, 3].aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    it("exception", () => {
        expect(() => ([] as any[]).aggregate((x, y) => x + y)).toThrowError(InvalidOperationException)
    })

    it("aggregate2", () => {
        const val = [1, 2, 3].aggregate(4, (x, y) => x + y)
        expect(val).toBe(10)

        const val2 = [1].aggregate(9, (x, y) => x + y)
        expect(val2).toBe(10)

        const val3 = ([] as number[]).aggregate(10, (x, y) => x + y)
        expect(val3).toBe(10)
    })

    it("aggregate3", () => {
        const val = [1, 2, 3].aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })
})

describe("all", () => {
    it("All", () => {
        // Create an array of Pets.
        const pets = [
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ]

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    it("many elements", () => {
        expect([1, 2, 3].all((x) => x !== 0)).toBe(true)
        expect([0, 1, 2].all((x) => x > 5)).toBe(false)
    })

    it("empty element true", () => {
        expect([].all((x) => x === 1)).toBe(true)
    })
})

describe("any", () => {

    it("Empty", () => {
        const array: number[] = []

        expect(array.any()).toBe(false)
        expect(array.any((_) => true)).toBe(false)
        expect(array.any((_) => false)).toBe(false)
    })

    it("AnyExists", () => {
        const array = [1, 2]

        expect(array.any()).toBe(true)
        expect(array.any((_) => true)).toBe(true)
        expect(array.any((_) => false)).toBe(false)

        expect(array.any((x) => x === 1)).toBe(true)
        expect(array.any((x) => x === 2)).toBe(true)
    })

    it("empty", () => {
        expect([].any()).toBe(false)
    })

    it("basic", () => {
        expect([1].any()).toBe(true)
    })

    it("empty predicate", () => {
        expect([].any((x) => x === 0)).toBe(false)
    })

    it("basic predicate", () => {
        expect([1].any((x) => x === 1)).toBe(true)
        expect([1].any((x) => x === 0)).toBe(false)
    })
})

describe("average", () => {
    it("basic", () =>
        expect([0, 10].average()).toBe(5))

    it("empty throws exception", () =>
        expect(() => [].average()).toThrowError(InvalidOperationException))

    it("selector", () =>
        expect([0, 10].average((x) => x * 10)).toBe(50))

    it("empty array with selector throws exception",
        () => expect(() => ([] as number[]).average((x) => x * 10)).toThrowError(InvalidOperationException))
})

describe("count", () => {
    it("Count Predicate", () => {
        const array = [true, true, false]

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    it("empty array to be zero", () =>
        expect([].count()).toBe(0))

    it("single element array to be one", () =>
        expect([1].count()).toBe(1))
})

describe("concat", () => {
    it("handles two empty arrays", () =>
        expect([].concat([])).toEqual([]))

    it("handles calling array being empty", () =>
        expect(([] as number[]).concat([1])).toEqual([1]))

    it("handles concat with empty array", () =>
        expect([2].concat([]).toArray()).toEqual([2]))

    it("handle two arrays concat", () =>
        expect([1].concat([2, 3]).toArray()).toEqual([1, 2, 3]))
})

describe("contains", () => {
    it("Countains", () => {
        const array = [1, "2", "3"]

        expect(array.contains(2)).toBe(false)
        expect(array.contains(1)).toBe(true)
    })

    it("Contains With Comparer", () => {
        const array = [1, "2", "3"]

        expect(array.contains(2, Linq.EqualityComparer)).toBe(true)
        expect(array.contains("2", Linq.EqualityComparer)).toBe(true)
        expect(array.contains(4, Linq.EqualityComparer)).toBe(false)
    })

    it("contains empty to be false", () =>
        expect(([] as number[]).contains(0)).toBe(false))

    it("contains false", () =>
        expect([1, 2].contains(0)).toBe(false))

    it("contains true", () =>
        expect([1, 2].contains(1)).toBe(true))
})

describe("distinct", () => {
    it("Distinct", () => {
        const array = ["f", "o", "o"]

        expect(array.distinct().toArray()).toEqual(["f", "o"])
    })

    it("DistinctWeakRequality", () => {
        const array = ["1", 1, 2, 2, 3, "3"]

        expect(array.distinct(Linq.EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    it("empty array to remain empty", () =>
        expect([].distinct().toArray()).toEqual([]))

    it("basic", () => {
        expect([1, 1].distinct().toArray()).toEqual([1])
    })
})

describe("first", () => {
    it("FirstEmptyException", () => {
        expect(() => [].first()).toThrowError(Linq.InvalidOperationException)
    })

    it("FirstPredicate", () => {
        expect([1, 2].first((x) => x === 2)).toBe(2)
    })

    it("FirstOrDefaultEmpty", () =>  {
        expect([].firstOrDefault()).toBeNull()
    })

    it("basic", () =>
        expect([1].first()).toBe(1))

    it("empty array causes exception", () =>
        expect(() => [].first()).toThrowError(InvalidOperationException))

    it("predicate", () =>
        expect([1, 2, 3].first((x) => x === 2)).toBe(2))

    it("empty array with predicate causes exception", () =>
        expect(() => [1, 2, 3].first((x) => x === 4)).toThrowError(InvalidOperationException))
})

describe("elementAt", () => {
    it("basic", () => {
        expect([1].elementAt(0)).toBe(1)
        expect([1, 2].elementAt(1)).toBe(2)
    })

    it("empty array throws exception", () =>
        expect(() => [].elementAt(0)).toThrowError(ArgumentOutOfRangeException))
})

describe("elementAtOrDefault", () => {
    it("with elements", () => {
        expect([1].elementAtOrDefault(0)).toBe(1)
        expect([1, 2].elementAtOrDefault(1)).toBe(2)
    })

    it("empty to be null", () =>
        expect([].elementAtOrDefault(0)).toBeNull())
})

describe("enumerateObject", () => {
    it("EnumerateObject", () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for (const item of Linq.Enumerable.enumerateObject(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })
})

describe("except", () => {
    it("basic", () => {
        expect([1, 2, 3].except([1, 2]).toArray()).toEqual([3])
    })
})

describe("flatten", () => {
    it("Flatten", () => {
        const a = Linq.Enumerable.flatten([1, 2, 3]).toArray()
        const b = Linq.Enumerable.flatten<string | number>([1, [2], "3"]).toArray()
        const c = Linq.Enumerable.flatten([1, [2, 3]]).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])

        const shallow = Linq.Enumerable.flatten([1, [2, [3]]], true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
        expect(shallow[2] instanceof Array).toBeTruthy()
        expect((shallow[2] as number[]).length).toBe(1)
        expect((shallow[2] as number[])[0]).toBe(3)
    })
})

describe("intersect", () => {
    it("IntersectWithEqualityComparer", () => {
        const array = [1, 2, "3"].intersect(["1", "2"], Linq.EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })
})

describe("joinByKey", () => {
    it("basic", () => {
        const joinBy = [1, 2, 3].joinByKey([1, 2, 3],
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
})

describe("take", () => {
    it("Take", () => {
        const array = [1, 2, 3, 4, 5].take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    const vals = [1, 2, 3, 4]

    it("various positive amounts", () => {
        expect(vals.take(4).toArray()).toEqual(vals)
        expect(vals.take(1).toArray()).toEqual([1])
        expect(vals.take(2).toArray()).toEqual([1, 2])
    })

    it("zero elements", () =>
        expect(vals.take(0).toArray()).toEqual([]))

    it("negative amount", () =>
        expect(vals.take(-1).toArray()).toEqual([]))
})

describe("takeWhile", () => {
    const vals = [1, 2, 3, 4]

    it("by value", () => {
        expect(vals.takeWhile((x) => true).toArray()).toEqual(vals)
        expect(vals.takeWhile((x) => false).toArray()).toEqual([])
        expect(vals.takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    it("by value and index", () => {
        expect(vals.takeWhile((x: number, i: number) => true).toArray()).toEqual(vals)
        expect(vals.takeWhile((x: number, i: number) => false).toArray()).toEqual([])
        expect(vals.takeWhile((x: number, i: number) => x !== 3).toArray()).toEqual([1, 2])
    })
})

describe("last", () => {
    it("Last", () => {
        expect([1, 2].last()).toBe(2)
    })

    it("LastEmpty", () => {
        expect(() => [].last()).toThrowError(Linq.InvalidOperationException)
    })

    it("LastPredicate", () => {
        expect([1, 2].last((x) => x === 1)).toBe(1)
    })
})

describe("lastOrDefault", () => {
    it("LastOrDefault", () => {
        expect([].lastOrDefault()).toBeNull()
    })

    it("LastOrDefaultPredicate", () => {
        expect([1, 2, 3].lastOrDefault((x) => x === 4)).toBeNull()
    })
})

describe("max", () => {
    it("MaxEmptyError", () => {
        expect(() => [].max()).toThrowError(Linq.InvalidOperationException)
    })

    it("MaxSelectEmptyError", () => {
        expect(() => ([] as number[]).max((x) => x * x))
            .toThrowError(Linq.InvalidOperationException)
    })

    it("MaxSelect", () => {
        expect([1, 2, 3].max((x) => x * x)).toBe(9)
    })

    it("basic", () => expect([1, 2, 3].max()).toBe(3))

    it("empty array throws exception", () =>
        expect(() => [].max()).toThrowError(InvalidOperationException))

    it("max with selector", () =>
        expect([1, 2, 3].max((x) => x * 2)).toBe(6))

    it("empty array throws exception with selector", () =>
        expect(() => ([] as number[]).max((x) => x * 2)).toThrowError(InvalidOperationException))
})

describe("min", () => {
    it("Min", () => {
        expect([1, 2, 3, -7].min()).toBe(-7)
    })

    it("MinEmptyError", () => {
        expect(() => [].min()).toThrowError(Linq.InvalidOperationException)
    })

    it("MinPredicate Empty Error", () => {
        expect(() => ([] as number[]).min((x) => x * x)).toThrowError(Linq.InvalidOperationException)
    })

    it("Min Predicate", () => {
        expect([1, 2, 3, -7].min(Math.abs)).toBe(1)
    })

    it("empty exception", () => {
        expect(() => [].min()).toThrowError(InvalidOperationException)
    })

    it("empty exception with selector", () => {
        expect(() => [].min((x) => x)).toThrowError(InvalidOperationException)
    })
})

describe("ofType", () => {
    const array = ["str", "str2", 1, 2, 3, {}, true, Number(1)]

    it("string", () => {
        expect(array.ofType("string").toArray()).toEqual(["str", "str2"])
    })

    it("number", () => {
        expect(array.ofType("number").toArray()).toEqual([1, 2, 3, 1])
    })

    it("object", () => {
        expect(array.ofType("object").toArray()).toEqual([{}])
    })

    it("boolean", () => {
        expect(array.ofType("boolean").toArray()).toEqual([true])
    })

    it("Number (Object)", () => {
        expect(array.ofType(Number).toArray()).toEqual([Number(1)])
    })
})

describe("orderBy", () => {
    it("string", () => {
        const vals = ["b", "c", "a"].orderBy((x) => x).toArray()

        expect(vals).toEqual(["a", "b", "c"])
    })

    it("basic", () => {
        const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(vals.orderBy((x) => x).toArray()).toEqual(vals)
    })
})

describe("orderByDescending", () => {
    it("basic", () => {
        const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(vals.orderByDescending((x) => x).toArray()).toEqual(vals.reverse())
    })
})

describe("reverse", () => {
    // TODO
    it("basic", () => {
        const vals = [1, 2, 3]
        expect(vals.reverse()).toEqual([3, 2, 1])
    })

    it("empty array still empty", () =>
        expect([].reverse()).toEqual([]))
})

describe("select", () => {
    it("select parseInt", () => {
        expect(["1", "2", "3"].select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    it("select length", () => {
        expect(["1", "22", "333"].select("length").toArray()).toEqual([1, 2, 3])
    })
})

describe("selectMany", () => {
    it("selectMany basic", () => {
        const values = [
            { a: [1, 2]},
            { a: [3, 4]},
        ]

        expect(values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })
})

describe("skip", () => {
    const vals = [1, 2, 3, 4]

    it("first element", () =>
        expect(vals.skip(1).toArray()).toEqual([2, 3, 4]))

    it("first two elements", () =>
        expect(vals.skip(0).toArray()).toEqual(vals))

    it("negative value", () =>
        expect(vals.skip(-9).toArray()).toEqual(vals))
})

describe("sum", () => {
    it("sum basic", () => {
        expect([ 43.68, 1.25, 583.7, 6.5 ].sum()).toBe(635.13)
    })

    it("sum Selector", () => {
        const zooms = [ { a: 1}, { a: 2 }, {a: 3} ]
        expect(zooms.sum((x) => x.a)).toBe(6)
    })
})

describe("union", () => {
    it("=== union", () => {
        const ints1 = [ 5, 3, 9, 7, 5, 9, 3, 7 ]
        const ints2 = [ 8, 3, 6, 4, 4, 9, 1, 0 ]
        const result = [5, 3, 9, 7, 8, 6, 4, 1, 0]
        const union = ints1.union(ints2).toArray()
        expect(union).toEqual(result)
    })

    it("== union", () => {
        const ints1: IEnumerable<string|number> = [ 5, 3, 9, 7, 5, 9, 3, 7 ]
        const ints2 = [ "8", "3", "6", "4", "4", "9", "1", "0" ]
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })
})

describe("where", () => {
    it("item predicate", () => {
        const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    it("item and index predicate", () => {
        const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(vals.where((x: number, i: number) => i === 9)).toEqual([9])
    })
})

describe("zip", () => {
    it("zip basic", () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = it1.zip(it2).toArray()

        expect(zip.length).toBe(it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.first).toBe(first)
            expect(val.second).toBe(second)
        }
    })

    it("zip selector", () => {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = it1.zip(it2, (a, b) => ({ a, b })).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            expect(val.a).toBe(first)
            expect(val.b).toBe(second)
        }
    })
})

describe("where", () => {
    it("where basic", () => {
        const stuff = [ "", "1", "2", "foo", "bar" ]
        const noEmptyStrings = stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = stuff
            .where((x: string, i: number) => i !== stuff.length - 1)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })
})
