import * as Linq from "./../src/index"
Linq.initialize()
// https://jasmine.github.io/2.0/introduction.html
import "jasmine"
import { ErrorString } from "../src/TypesAndHelpers"

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

})

describe("count", () => {
    it("Count Predicate", () => {
        const array = [true, true, false]

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })
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

describe("take", () => {
    it("Take", () => {
        const array = [1, 2, 3, 4, 5].take(2).toArray()

        expect(array).toEqual([1, 2])
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
})

describe("ofType", () => {
    const array = ["str", "str2", 1, 2, 3, {}, true, Number(1)]

    it("string", () => {
        expect(array.ofType("string").toArray()).toEqual(["str", "str2"])
    })

    it("number", () => {
        expect(array.ofType("number").toArray()).toEqual([1, 2, 3])
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

describe("sum", () => {
    it("sum basic", () => {
        expect([ 43.68, 1.25, 583.7, 6.5 ].sum()).toBe(635.13)
    })

    it("sum Selector", () => {
        const zooms = [ { a: 1}, { a: 2 }, {a: 3} ]
        expect(zooms.sum((x) => x.a)).toBe(6)
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

/*
import * as Linq from "./../src/index"
import { NumberTest } from "./LinqNumberArrays"
import { LinqTests } from "./LinqBasicTypes"
import { TestClass, RunTests } from "./UnitTest"
Linq.initialize()

import "./LinqCollections"

@TestClass
class ArrayNumberTests extends NumberTest<Array<number>> {
    constructor() {
        super(x => x)
    }
}

@TestClass
class EnumerableNumberTests extends NumberTest<Linq.IEnumerable<number>> {
    constructor() {
        super(x => x.select(y => y))
    }
}

@TestClass
class Float32Tests extends NumberTest<Float32Array> {
    constructor() {
        super(x => new Float32Array(x))
    }
}

@TestClass
class Float64Tests extends NumberTest<Float64Array> {
    constructor() {
        super(x => new Float64Array(x))
    }
}

@TestClass
class ByteTests extends NumberTest<Int8Array> {
    constructor() {
        super(x => new Int8Array(x))
    }
}

@TestClass
class UByteTests extends NumberTest<Uint8Array> {
     constructor() {
        super(x => new Uint8Array(x))
    }
}

@TestClass
class UByteClampedTests extends NumberTest<Uint8ClampedArray> {
     constructor() {
        super(x => new Uint8ClampedArray(x))
    }
}

@TestClass
class ShortTests extends NumberTest<Int16Array> {
    constructor() {
        super(x => new Int16Array(x))
    }
}

@TestClass
class UShortTests extends NumberTest<Uint16Array> {
    constructor() {
        super(x => new Uint16Array(x))
    }
}

@TestClass
class IntTests extends NumberTest<Int32Array> {
    constructor() {
        super(x => new Int32Array(x))
    }
}

@TestClass
class UIntTests extends NumberTest<Uint32Array> {
    constructor() {
        super(x => new Uint32Array(x))
    }
}

@TestClass
class ArrayAnyTests extends LinqTests {
    constructor() {
        super(x => x)
    }
}

@TestClass
class EnumerableAnyTests extends LinqTests {
    constructor() {
        // Makes a BasicEnumerable
        super(x => x.select(y => y))
    }
}

RunTests()

declare var process: any
process.exit()
*/
