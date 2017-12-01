// import { ErrorString } from "../src/TypesAndHelpers"
import {
    ArgumentOutOfRangeException,
    ArrayEnumerable,
    AsyncEnumerable,
    // BasicEnumerable,
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

describe("fromEvent", () => {
    it("ClickAsync", (done) => {
        const button = document.createElement("button")
        const body = document.querySelector("body")
        if (body) {
            body.appendChild(button)

            const asyncEnum = AsyncEnumerable.fromEvent(button, "click")
            asyncEnum.first().then((value) => {
                expect(value instanceof MouseEvent).toBe(true)
                done()
            })

            button.click()
        } else {
            fail()
        }
    })

    itAsync("ClickAsyncMultiple", async () => {
        const button = document.createElement("button")
        const body = document.querySelector("body")
        if (body) {
            body.appendChild(button)

            const asyncEnum = AsyncEnumerable.fromEvent(button, "click")
            setTimeout(() => {
                button.click()
            }, 10)

            let clicks = 10
            for await (const value of asyncEnum) {
                expect(value instanceof MouseEvent).toBe(true)
                if (clicks--) {
                    setTimeout(() => button.click(), 10)
                } else {
                    break
                }
            }
        } else {
            fail()
        }
    })
})

describe("AsyncEnumerableIteration", () => {
    itAsync("AsyncGeneratorBehavior", async () => {
        async function* generatorFunc() {
            for (const value of []) {
                yield value
            }
        }

        const generator = generatorFunc()
        const nextValue = await generator.next()
        expect(nextValue.done).toBe(true)

        const generator2 = generatorFunc()
        for await (const value of generator2) {
            fail("Value Detected In Generator")
        }
    })

    itAsync("AsyncGeneratorError", async () => {
        async function* generatorFunc() {
            for (const value of [1, 2, 3]) {
                yield value
                throw new Error("Test")
            }
        }

        const generator = generatorFunc()

        try {
            for await (const value of generator) {
                expect(value).toBe(1)
            }
        } catch (e) {
            return
        }

        fail("Catch Didn't Execute")
    })

    itAsync("AsyncEnumerableBehavior", async () => {
        async function* generatorFunc() {
            for (const value of []) {
                yield value
            }
        }

        const asyncEnumerable = AsyncEnumerable.from(generatorFunc)
        const generator = asyncEnumerable[Symbol.asyncIterator]()
        const nextValue = await generator.next()
        expect(nextValue.done).toBe(true)

        const generator2 = asyncEnumerable[Symbol.asyncIterator]()
        for await (const value of generator2) {
            fail("Value Detected In Generator")
        }
    })
})

describe("aggregate", () => {

    itEnumerable<string>("Basic", (asEnumerable) => {
        const array = asEnumerable(["f", "o", "o"])

        expect(array.aggregate((x, y) => x + y)).toBe("foo")

        const sentence = "the quick brown fox jumps over the lazy dog"
        // Split the string into individual words.
        const words = asEnumerable(sentence.split(" "))
        // Prepend each word to the beginning of the
        // new sentence to reverse the word order.
        const reversed = words.aggregate((workingSentence, next) =>
                                        next + " " + workingSentence)
        expect(reversed).toBe("dog lazy the over jumps fox brown quick the")
    })

    itAsync("BasicAsync", async () => {
        const asyncArray = asAsync(["f", "o", "o"])
        expect(await asyncArray.aggregate((x, y) => x + y)).toBe("foo")
        const sentence = "the quick brown fox jumps over the lazy dog"

        // Split the string into individual words.
        const words = asAsync(sentence.split(" "))
        // Prepend each word to the beginning of the
        // new sentence to reverse the word order.
        const reversed = await words.aggregate((workingSentence, next) =>
                                        next + " " + workingSentence)
        expect(reversed).toBe("dog lazy the over jumps fox brown quick the")
    })

    itEnumerable<string>("ResultSelector", (asEnumerable) => {
        const fruits = asEnumerable([ "apple", "mango", "orange", "passionfruit", "grape" ])

        // Determine whether any string in the array is longer than "banana".
        const longestName = fruits.aggregate(
            "banana",
            (longest, next) => next.length > longest.length ? next : longest,
            // Return the final result as an upper case string.
            (fruit) => fruit.toUpperCase())

        expect(longestName).toBe("PASSIONFRUIT")
    })

    itAsync("ResultSelectorAsync", async () => {
        const fruits = asAsync([ "apple", "mango", "orange", "passionfruit", "grape" ])

        // Determine whether any string in the array is longer than "banana".
        const longestName = await fruits.aggregate(
            "banana",
            (longest, next) => next.length > longest.length ? next : longest,
            // Return the final result as an upper case string.
            (fruit) => fruit.toUpperCase())

        expect(longestName).toBe("PASSIONFRUIT")
    })

    itEnumerable("SingleValue", (asEnumerable) => {
        const val2 = asEnumerable([1]).aggregate((x, y) => x + y)
        expect(val2).toBe(1)
    })

    itAsync("SingleValueAsync", async () => {
        const val2 = await asAsync([1]).aggregate((x, y) => x + y)
        expect(val2).toBe(1)
    })

    itEnumerable("MultipleValues", (asEnumerable) => {
        const val = asEnumerable([1, 2, 3]).aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    itAsync("MultipleValuesAsync", async () => {
        const val = await asAsync([1, 2, 3]).aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    itEnumerable<any>("Exception", (asEnumerable) => {
        expect(() => asEnumerable([] as any[]).aggregate((x, y) => x + y)).toThrowError(InvalidOperationException)
    })

    itAsync("ExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([] as number[]).aggregate((x, y) => x + y))
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable<number>("aggregate2", (asEnumerable) => {
        const val = asEnumerable([1, 2, 3]).aggregate(4, (x, y) => x + y)
        expect(val).toBe(10)

        const val2 = asEnumerable([1]).aggregate(9, (x, y) => x + y)
        expect(val2).toBe(10)

        const val3 = asEnumerable([] as number[]).aggregate(10, (x, y) => x + y)
        expect(val3).toBe(10)
    })

    itAsync("Aggregate2Async", async () => {
        const val = await asAsync([1, 2, 3]).aggregate(4, (x, y) => x + y)
        expect(val).toBe(10)

        const val2 = await asAsync([1]).aggregate(9, (x, y) => x + y)
        expect(val2).toBe(10)

        const val3 = await asAsync([] as number[]).aggregate(10, (x, y) => x + y)
        expect(val3).toBe(10)
    })

    itEnumerable("Aggregate3", (asEnumerable) => {
        const val = asEnumerable([1, 2, 3]).aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })

    itAsync("Aggregate3Async", async () => {
        const val = await asAsync([1, 2, 3]).aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })
})

describe("all", () => {
    itEnumerable<{ Age: number, Name: string}>("All", (asEnumerable) => {
        // Create an array of Pets.
        const pets = asEnumerable([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itAsync("AllAsync", async () => {
        // Create an array of Pets.
        const pets = asAsync([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itEnumerable("ManyElements", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(asEnumerable([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itAsync("ManyElementsAsync", async () => {
        expect(await asAsync([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itEnumerable("EmptyElementTrue", (asEnumerable) => {
        expect(asEnumerable([]).all((x) => x === 1)).toBe(true)
    })

    itAsync("EmptyElementTrue", async () => {
        const expect = await expectAsync(asAsync([]).all((x) => x === 1))
        expect.toBe(true)
    })
})

describe("any", () => {

    itEnumerable("Empty", (asEnumerable) => {
        const array = asEnumerable([])

        expect(array.any()).toBe(false)
        expect(array.any((_) => true)).toBe(false)
        expect(array.any((_) => false)).toBe(false)
    })

    itAsync("EmptyAsync", async () => {
        const array = asAsync([])

        expect(await array.any()).toBe(false)
        expect(await array.any((_) => true)).toBe(false)
        expect(await array.any((_) => false)).toBe(false)
    })

    itEnumerable("AnyExists", (asEnumerable) => {
        const array = asEnumerable([1, 2])

        expect(array.any()).toBe(true)
        expect(array.any((_) => true)).toBe(true)
        expect(array.any((_) => false)).toBe(false)

        expect(array.any((x) => x === 1)).toBe(true)
        expect(array.any((x) => x === 2)).toBe(true)
    })

    itAsync("AnyExistsAsync", async () => {
        const array = asAsync([1, 2])

        expect(await array.any()).toBe(true)
        expect(await array.any((_) => true)).toBe(true)
        expect(await array.any((_) => false)).toBe(false)

        expect(await array.any((x) => x === 1)).toBe(true)
        expect(await array.any((x) => x === 2)).toBe(true)
    })

    itEnumerable("Empty", (asEnumerable) => {
        expect(asEnumerable([]).any()).toBe(false)
    })

    itAsync("EmptyAsync", async () => {
        (await expectAsync(asAsync([]).any())).toBe(false)
    })

    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1]).any()).toBe(true)
    })

    itAsync("basicAsync", async () => {
        expect(await asAsync([1]).any()).toBe(true)
    })

    itEnumerable("EmptyPredicate", (asEnumerable) => {
        expect(asEnumerable([]).any((x) => x === 0)).toBe(false)
    })

    itAsync("EmptyPredicateAsync", async () => {
        const expect = await expectAsync(asAsync([]).any((x) => x === 0))
        expect.toBe(false)
    })

    itEnumerable("BasicPredicate", (asEnumerable) => {
        expect(asEnumerable([1]).any((x) => x === 1)).toBe(true)
        expect(asEnumerable([1]).any((x) => x === 0)).toBe(false)
    })

    itAsync("BasicPredicateAsync", async () => {
        expect(await asAsync([1]).any((x) => x === 1)).toBe(true)
        expect(await asAsync([1]).any((x) => x === 0)).toBe(false)
    })
})

describe("average", () => {
    itEnumerable("basic", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average()).toBe(5))

    itAsync("basicAsync", async () =>
        expect(await asAsync([0, 10]).average()).toBe(5))

    itEnumerable("empty throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).average()).toThrowError(InvalidOperationException))

    itAsync("EmptyThrowsException", async () => {
        const expect = await expectAsync(asAsync([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("selector", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average((x) => x * 10)).toBe(50))

    itAsync("selectorAsync", async () =>
        expect(await asAsync([0, 10]).average((x) => x * 10)).toBe(50))

    itEnumerable("empty array with selector throws exception",
        (asEnumerable) => expect(
            () => asEnumerable([] as number[]).average((x) => x * 10)).toThrowError(InvalidOperationException))

    itAsync("empty array with selector throws exception Async", async () => {
        const expect = await expectAsync((asAsync([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })
})

describe("count", () => {
    itEnumerable<boolean>("Count Predicate", (asEnumerable) => {
        const array = asEnumerable([true, true, false])

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    itAsync("CountPredicateAsync", async () => {
        const array = asAsync([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    itEnumerable("empty array to be zero", (asEnumerable) =>
        expect(asEnumerable([]).count()).toBe(0))

    itAsync("empty array to be zero async", async () =>
        (await expectAsync(asAsync([]).count())).toBe(0))

    itEnumerable("single element array to be one", (asEnumerable) =>
        expect(asEnumerable([1]).count()).toBe(1))

    itAsync("single element array to be one Async", async () =>
        expect(await asAsync([1]).count()).toBe(1))
})

describe("concat", () => {
    itEnumerable("handles two empty arrays", (asEnumerable) =>
        expect(asEnumerable([]).concat(asEnumerable([])).toArray()).toEqual([]))

    itAsync("handles two empty arrays async", async () => {
        const value = await asAsync([]).concat(asAsync([])).toArray()
        expect(value).toEqual([])
    })

    it("handles calling array being empty", () =>
        expect(([] as number[]).concat([1])).toEqual([1]))

    itAsync("handles calling array being empty async", async () => {
        const value = await asAsync([] as number[]).concat(asAsync([1])).toArray()
        expect(value).toEqual([1])
    })

    itEnumerable("handles concat with empty array", (asEnumerable) =>
        expect(asEnumerable([2]).concat(asEnumerable([])).toArray()).toEqual([2]))

    itAsync("handles concat with empty array async", async () => {
        const value = await asAsync([2]).concat(asAsync([])).toArray()
        expect(value).toEqual([2])
    })

    itEnumerable("handle two arrays concat", (asEnumerable) =>
        expect(asEnumerable([1]).concat(asEnumerable([2, 3])).toArray()).toEqual([1, 2, 3]))

    itAsync("handle two arrays concat async", async () => {
        const value = await asAsync([1]).concat(asAsync([2, 3])).toArray()
        expect(value).toEqual([1, 2, 3])
    })

    it("ArrayEnumerable Concat", () => {
        const a = new ArrayEnumerable(1, 2)
        expect(a.concat(3)).toEqual([1, 2, 3])
    })
})

describe("contains", () => {
    itEnumerable<string | number>("Countains", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2)).toBe(false)
        expect(array.contains(1)).toBe(true)
    })

    itAsync("CountainsAsync", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    itEnumerable<string | number>("Contains With Comparer", (asEnumerable) => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2, EqualityComparer)).toBe(true)
        expect(array.contains("2", EqualityComparer)).toBe(true)
        expect(array.contains(4, EqualityComparer)).toBe(false)
    })

    itAsync("Contains With ComparerAsync", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2, EqualityComparer)).toBe(true)
        expect(await array.contains("2", EqualityComparer)).toBe(true)
        expect(await array.contains(4, EqualityComparer)).toBe(false)
    })

    itEnumerable("contains empty to be false", (asEnumerable) =>
        expect(asEnumerable([] as number[]).contains(0)).toBe(false))

    itAsync("contains empty to be false async", async () => {
        const value = await asAsync([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    itEnumerable("contains false", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(0)).toBe(false))

    itAsync("Contains False Async", async () =>
        expect(await asAsync([1, 2]).contains(0)).toBe(false))

    itEnumerable("contains true", (asEnumerable) =>
        expect(asEnumerable([1, 2]).contains(1)).toBe(true))

    it("Contains True Async", async () =>
        expect(await asAsync([1, 2]).contains(1)).toBe(true))
})

describe("distinct", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 1]).distinct().toArray()).toEqual([1])
    })

    itAsync("Basic Async", async () => {
        expect(await asAsync([1, 1]).distinct().toArray()).toEqual([1])
    })

    itEnumerable<string | number>("Distinct", (asEnumerable) => {
        const array = asEnumerable(["f", "o", "o"])

        expect(array.distinct().toArray()).toEqual(["f", "o"])
    })

    itAsync("DistinctAsync", async () => {
        const array = asAsync(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    itEnumerable<string | number>("DistinctWeakRequality", (asEnumerable) => {
        const array = asEnumerable(["1", 1, 2, 2, 3, "3"])

        expect(array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakRequalityAsync", async () => {
        const array = asAsync(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itEnumerable("empty array to remain empty", (asEnumerable) =>
        expect(asEnumerable([]).distinct().toArray()).toEqual([]))

    itAsync("empty array to remain empty async", async () => {
        const value = await asAsync([]).distinct().toArray()
        expect(value).toEqual([])
    })
})

describe("first", () => {
    itEnumerable("FirstEmptyException", (asEnumerable) => {
        expect(() => asEnumerable([]).first()).toThrowError(InvalidOperationException)
    })

    itAsync("FirstEmptyExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([]).first())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("FirstPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicateAsync", async () => {
        expect(await asAsync([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itEnumerable("FirstOrDefaultEmpty", (asEnumerable) =>  {
        expect(asEnumerable([]).firstOrDefault()).toBeNull()
    })

    itAsync("FirstOrDefaultEmptyAsync", async () =>  {
        (await expectAsync(asAsync([]).firstOrDefault())).toBeNull()
    })

    itEnumerable("basic", (asEnumerable) =>
        expect(asEnumerable([1]).first()).toBe(1))

    itAsync("BasicAsync", async () =>
        expect(await asAsync([1]).first()).toBe(1))

    itEnumerable("predicate", (asEnumerable) =>
        expect(asEnumerable([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itAsync("PredicateAsync", async () =>
        expect(await asAsync([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itEnumerable("empty array with predicate causes exception", (asEnumerable) =>
        expect(() => asEnumerable([1, 2, 3]).first((x) => x === 4)).toThrowError(InvalidOperationException))

    itAsync("empty array with predicate causes exception", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).first((x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })
})

describe("elementAt", () => {
    itEnumerable("Basic", (asEnumerable) => {
        expect(asEnumerable([1]).elementAt(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAt(1)).toBe(2)
    })

    itAsync("BasicAsync", async () => {
        expect(await asAsync([1]).elementAt(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAt(1)).toBe(2)
    })

    itEnumerable("empty array throws exception", (asEnumerable) =>
        expect(() => asEnumerable([]).elementAt(0)).toThrowError(ArgumentOutOfRangeException))

    itAsync("empty array throws exception", async () => {
        const expect = await expectAsync(asAsync([]).elementAt(0))
        expect.toThrowError(ArgumentOutOfRangeException)
    })
})

describe("elementAtOrDefault", () => {

    it("ArrayEnumerable", () => {
        const arrayEnum = new ArrayEnumerable(1, 2, 3)
        for (const val of arrayEnum) {
            expect(val).toBeDefined()
        }
    })

    itEnumerable("with elements", (asEnumerable) => {
        expect(asEnumerable([1]).elementAtOrDefault(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itAsync("WithElementsAsync", async () => {
        expect(await asAsync([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itEnumerable("empty to be null", (asEnumerable) =>
        expect(asEnumerable([]).elementAtOrDefault(0)).toBeNull())

    itAsync("empty to be null async", async () => {
        const expect = await expectAsync(asAsync([]).elementAtOrDefault(0))
        expect.toBeNull()
    })
})

describe("enumerateObject", () => {
    it("EnumerateObject", () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for (const item of Enumerable.enumerateObject(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })
})

describe("except", () => {
    itEnumerable("basic", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).except(asEnumerable([1, 2])).toArray()).toEqual([3])
    })

    itAsync("basicAsync", async () => {
        const value = await asAsync([1, 2, 3]).except(asAsync([1, 2])).toArray()
        expect(value).toEqual([3])
    })

    itEnumerable<string | number>("with comparer", (asEnumerable) => {
        expect(asEnumerable([1, "2", 3]).except(asEnumerable([1, "2"]), EqualityComparer).toArray()).toEqual([3])
    })

    itAsync("with comparer async", async () => {
        const value = await asAsync([1, "2", 3]).except(asAsync([1, "2"]), EqualityComparer).toArray()
        expect(value).toEqual([3])
    })
})

describe("flatten", () => {
    itEnumerable<any>("Basic", (asEnumerable) => {
        const a = Enumerable.flatten(asEnumerable([1, 2, 3])).toArray()
        const b = Enumerable.flatten(asEnumerable([1, [2], "3"])).toArray()
        const c = Enumerable.flatten(asEnumerable([1, [2, 3]])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itEnumerable<any>("Shallow", (asEnumerable) => {
        const shallow = Enumerable.flatten(asEnumerable([1, [2, [3]]]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
        expect(shallow[2] instanceof Array).toBeTruthy()
        expect((shallow[2] as number[]).length).toBe(1)
        expect((shallow[2] as number[])[0]).toBe(3)
    })

    itAsync("BasicAsync", async () => {
        const a = await AsyncEnumerable.flatten(asAsync<any>([1, 2, 3])).toArray()
        const b = await AsyncEnumerable.flatten(asAsync<any>([1, asAsync([2]), "3"])).toArray()
        const c = await AsyncEnumerable.flatten(asAsync([1, asAsync([2, 3])])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itAsync("ShallowAsync", async () => {
        const shallow = await AsyncEnumerable.flatten(asAsync<any>([1, asAsync([2, asAsync([3])])]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
    })
})

describe("groupBy", () => {
    itEnumerable("OddEven", (asEnumerable) => {
        const groupBy = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9]).groupBy((x) => x % 2)
        for (const group of groupBy) {
            expect(group.key === 0 || group.key === 1).toBe(true)
            if (group.key === 0) {
                expect(group.toArray()).toEqual([2, 4, 6, 8])
            } else {
                expect(group.toArray()).toEqual([1, 3, 5, 7, 9])
            }
        }
    })

    itAsync("OddEvenAsync", async () => {
        const groupBy = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]).groupBy((x) => x % 2)
        for await (const group of groupBy) {
            expect(group.key === 0 || group.key === 1).toBe(true)
            if (group.key === 0) {
                expect(group.toArray()).toEqual([2, 4, 6, 8])
            } else {
                expect(group.toArray()).toEqual([1, 3, 5, 7, 9])
            }
        }
    })
})

describe("groupByWithSel", () => {
    itEnumerable<{ key: string, value: number }>("ObjectSelect", (asEnumerable) => {
        const array = asEnumerable([{ key: "foo", value: 0 }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value)
        const groupingArray = grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual([0, 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itAsync("ObjectSelectAsync", async () => {
        const array = asAsync([{ key: "foo", value: 0 }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual([0, 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itEnumerable<{ key: string, value: any }>("ObjectSelectWithComparer", (asEnumerable) => {
        const array = asEnumerable([{ key: "foo", value: "0" }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value, EqualityComparer)
        const groupingArray = grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual(["0", 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itAsync("ObjectSelectWithComparerAsync", async () => {
        const array = asAsync([{ key: "foo", value: "0" }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value, EqualityComparer)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual(["0", 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itEnumerable<number>("SingleKey", (asEnumerable) => {
        const singleKey = "singleKey"
        const grouping = asEnumerable([1, 2, 3]).groupByWithSel((x) => singleKey, (x) => x.toString())

        for (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    itAsync("SingleKey", async () => {
        const singleKey = "singleKey"
        const grouping = asAsync([1, 2, 3]).groupByWithSel((x) => singleKey, (x) => x.toString())

        for await (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    // TODO
})

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
