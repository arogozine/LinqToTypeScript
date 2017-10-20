import { IAsyncEnumerable } from "../src/AsyncInterfaces"
import { IEnumerable } from "../src/Interfaces"
import {
    ArgumentOutOfRangeException,
    EqualityComparer,
    ErrorString,
    InvalidOperationException } from "../src/TypesAndHelpers"
import { ArrayEnumerable, AsyncEnumerable, BasicEnumerable, Enumerable } from "./../src/index"

// Tests use Jasmine framework,
// https://jasmine.github.io/2.0/introduction.html

// We want the description to be the function
// being tested

declare function describe(
    description: (keyof IEnumerable<any>) |
        (keyof typeof Enumerable) | (keyof typeof AsyncEnumerable) | "AsyncEnumerableIteration",
    specDefinitions: (this: never) => void): void

function asEnumerable<T>(values: T[]): IEnumerable<T> {
    const array = new ArrayEnumerable<T>()
    array.push(...values)
    return array
    /*
    return new BasicEnumerable<T>(function* meh() {
        for (const x of values) {
            yield x
        }
    })
    */
}

function asAsync<T>(values: T[]) {
    async function *promises() {
        for (const value of values) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(value), 10))
        }
    }
    return AsyncEnumerable.from(promises)
}

function itAsync<T>(expectation: string, assertion: () => Promise<T>, timeout?: number): void {
    it(expectation, (done) => assertion().then(done, fail), timeout)
}

async function expectAsync<T>(promise: Promise<T>) {
    try {
        return expect(await promise)
    } catch (e) {
        return expect(() => { throw e })
    }
}

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

    it("Basic", () => {
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

    it("ResultSelector", () => {
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

    it("SingleValue", () => {
        const val2 = asEnumerable([1]).aggregate((x, y) => x + y)
        expect(val2).toBe(1)
    })

    itAsync("SingleValueAsync", async () => {
        const val2 = await asAsync([1]).aggregate((x, y) => x + y)
        expect(val2).toBe(1)
    })

    it("MultipleValues", () => {
        const val = asEnumerable([1, 2, 3]).aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    itAsync("MultipleValuesAsync", async () => {
        const val = await asAsync([1, 2, 3]).aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    it("Exception", () => {
        expect(() => asEnumerable([] as any[]).aggregate((x, y) => x + y)).toThrowError(InvalidOperationException)
    })

    itAsync("ExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([] as number[]).aggregate((x, y) => x + y))
        expect.toThrowError(InvalidOperationException)
    })

    it("aggregate2", () => {
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

    it("Aggregate3", () => {
        const val = asEnumerable([1, 2, 3]).aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })

    itAsync("Aggregate3Async", async () => {
        const val = await asAsync([1, 2, 3]).aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })
})

describe("all", () => {
    it("All", () => {
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

    it("ManyElements", () => {
        expect(asEnumerable([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(asEnumerable([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itAsync("ManyElementsAsync", async () => {
        expect(await asAsync([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    it("EmptyElementTrue", () => {
        expect(asEnumerable([]).all((x) => x === 1)).toBe(true)
    })

    itAsync("EmptyElementTrue", async () => {
        const expect = await expectAsync(asAsync([]).all((x) => x === 1))
        expect.toBe(true)
    })
})

describe("any", () => {

    it("Empty", () => {
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

    it("AnyExists", () => {
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

    it("Empty", () => {
        expect(asEnumerable([]).any()).toBe(false)
    })

    itAsync("EmptyAsync", async () => {
        (await expectAsync(asAsync([]).any())).toBe(false)
    })

    it("basic", () => {
        expect(asEnumerable([1]).any()).toBe(true)
    })

    itAsync("basicAsync", async () => {
        expect(await asAsync([1]).any()).toBe(true)
    })

    it("EmptyPredicate", () => {
        expect(asEnumerable([]).any((x) => x === 0)).toBe(false)
    })

    itAsync("EmptyPredicateAsync", async () => {
        const expect = await expectAsync(asAsync([]).any((x) => x === 0))
        expect.toBe(false)
    })

    it("BasicPredicate", () => {
        expect(asEnumerable([1]).any((x) => x === 1)).toBe(true)
        expect(asEnumerable([1]).any((x) => x === 0)).toBe(false)
    })

    itAsync("BasicPredicateAsync", async () => {
        expect(await asAsync([1]).any((x) => x === 1)).toBe(true)
        expect(await asAsync([1]).any((x) => x === 0)).toBe(false)
    })
})

describe("average", () => {
    it("basic", () =>
        expect(asEnumerable([0, 10]).average()).toBe(5))

    itAsync("basicAsync", async () =>
        expect(await asAsync([0, 10]).average()).toBe(5))

    it("empty throws exception", () =>
        expect(() => asEnumerable([]).average()).toThrowError(InvalidOperationException))

    itAsync("EmptyThrowsException", async () => {
        const expect = await expectAsync(asAsync([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    it("selector", () =>
        expect(asEnumerable([0, 10]).average((x) => x * 10)).toBe(50))

    itAsync("selectorAsync", async () =>
        expect(await asAsync([0, 10]).average((x) => x * 10)).toBe(50))

    it("empty array with selector throws exception",
        () => expect(() => asEnumerable([] as number[]).average((x) => x * 10)).toThrowError(InvalidOperationException))

    itAsync("empty array with selector throws exception Async", async () => {
        const expect = await expectAsync((asAsync([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })
})

describe("count", () => {
    it("Count Predicate", () => {
        const array = asEnumerable([true, true, false])

        expect(array.count((x) => x)).toBe(2)
        expect(array.count((x) => !x)).toBe(1)
    })

    itAsync("CountPredicateAsync", async () => {
        const array = asAsync([true, true, false])

        expect(await array.count((x) => x)).toBe(2)
        expect(await array.count((x) => !x)).toBe(1)
    })

    it("empty array to be zero", () =>
        expect(asEnumerable([]).count()).toBe(0))

    itAsync("empty array to be zero async", async () =>
        (await expectAsync(asAsync([]).count())).toBe(0))

    it("single element array to be one", () =>
        expect(asEnumerable([1]).count()).toBe(1))

    itAsync("single element array to be one Async", async () =>
        expect(await asAsync([1]).count()).toBe(1))
})

describe("concat", () => {
    it("handles two empty arrays", () =>
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

    it("handles concat with empty array", () =>
        expect(asEnumerable([2]).concat(asEnumerable([])).toArray()).toEqual([2]))

    itAsync("handles concat with empty array async", async () => {
        const value = await asAsync([2]).concat(asAsync([])).toArray()
        expect(value).toEqual([2])
    })

    it("handle two arrays concat", () =>
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
    it("Countains", () => {
        const array = asEnumerable([1, "2", "3"])

        expect(array.contains(2)).toBe(false)
        expect(array.contains(1)).toBe(true)
    })

    itAsync("CountainsAsync", async () => {
        const array = asAsync([1, "2", "3"])

        expect(await array.contains(2)).toBe(false)
        expect(await array.contains(1)).toBe(true)
    })

    it("Contains With Comparer", () => {
        const array = asEnumerable<string | number>([1, "2", "3"])

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

    it("contains empty to be false", () =>
        expect(asEnumerable([] as number[]).contains(0)).toBe(false))

    itAsync("contains empty to be false async", async () => {
        const value = await asAsync([] as number[]).contains(0)
        expect(value).toBe(false)
    })

    it("contains false", () =>
        expect(asEnumerable([1, 2]).contains(0)).toBe(false))

    itAsync("Contains False Async", async () =>
        expect(await asAsync([1, 2]).contains(0)).toBe(false))

    it("contains true", () =>
        expect(asEnumerable([1, 2]).contains(1)).toBe(true))

    it("Contains True Async", async () =>
        expect(await asAsync([1, 2]).contains(1)).toBe(true))
})

describe("distinct", () => {
    it("basic", () => {
        expect(asEnumerable([1, 1]).distinct().toArray()).toEqual([1])
    })

    itAsync("Basic Async", async () => {
        expect(await asAsync([1, 1]).distinct().toArray()).toEqual([1])
    })

    it("Distinct", () => {
        const array = asEnumerable(["f", "o", "o"])

        expect(array.distinct().toArray()).toEqual(["f", "o"])
    })

    itAsync("DistinctAsync", async () => {
        const array = asAsync(["f", "o", "o"])

        expect(await array.distinct().toArray()).toEqual(["f", "o"])
    })

    it("DistinctWeakRequality", () => {
        const array = asEnumerable<string | number>(["1", 1, 2, 2, 3, "3"])

        expect(array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    itAsync("DistinctWeakRequalityAsync", async () => {
        const array = asAsync(["1", 1, 2, 2, 3, "3"])

        expect(await array.distinct(EqualityComparer).toArray()).toEqual(["1", 2, 3])
    })

    it("empty array to remain empty", () =>
        expect(asEnumerable([]).distinct().toArray()).toEqual([]))

    itAsync("empty array to remain empty async", async () => {
        const value = await asAsync([]).distinct().toArray()
        expect(value).toEqual([])
    })
})

describe("first", () => {
    it("FirstEmptyException", () => {
        expect(() => asEnumerable([]).first()).toThrowError(InvalidOperationException)
    })

    itAsync("FirstEmptyExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([]).first())
        expect.toThrowError(InvalidOperationException)
    })

    it("FirstPredicate", () => {
        expect(asEnumerable([1, 2]).first((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicateAsync", async () => {
        expect(await asAsync([1, 2]).first((x) => x === 2)).toBe(2)
    })

    it("FirstOrDefaultEmpty", () =>  {
        expect(asEnumerable([]).firstOrDefault()).toBeNull()
    })

    itAsync("FirstOrDefaultEmptyAsync", async () =>  {
        (await expectAsync(asAsync([]).firstOrDefault())).toBeNull()
    })

    it("basic", () =>
        expect(asEnumerable([1]).first()).toBe(1))

    itAsync("BasicAsync", async () =>
        expect(await asAsync([1]).first()).toBe(1))

    it("predicate", () =>
        expect(asEnumerable([1, 2, 3]).first((x) => x === 2)).toBe(2))

    itAsync("PredicateAsync", async () =>
        expect(await asAsync([1, 2, 3]).first((x) => x === 2)).toBe(2))

    it("empty array with predicate causes exception", () =>
        expect(() => asEnumerable([1, 2, 3]).first((x) => x === 4)).toThrowError(InvalidOperationException))

    itAsync("empty array with predicate causes exception", async () => {
        const value = await expectAsync(asAsync([1, 2, 3]).first((x) => x === 4))
        value.toThrowError(InvalidOperationException)
    })
})

describe("elementAt", () => {
    it("Basic", () => {
        expect(asEnumerable([1]).elementAt(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAt(1)).toBe(2)
    })

    itAsync("BasicAsync", async () => {
        expect(await asAsync([1]).elementAt(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAt(1)).toBe(2)
    })

    it("empty array throws exception", () =>
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

    it("with elements", () => {
        expect(asEnumerable([1]).elementAtOrDefault(0)).toBe(1)
        expect(asEnumerable([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    itAsync("WithElementsAsync", async () => {
        expect(await asAsync([1]).elementAtOrDefault(0)).toBe(1)
        expect(await asAsync([1, 2]).elementAtOrDefault(1)).toBe(2)
    })

    it("empty to be null", () =>
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
    it("basic", () => {
        expect(asEnumerable([1, 2, 3]).except(asEnumerable([1, 2])).toArray()).toEqual([3])
    })

    itAsync("basicAsync", async () => {
        const value = await asAsync([1, 2, 3]).except(asAsync([1, 2])).toArray()
        expect(value).toEqual([3])
    })
})

describe("flatten", () => {
    it("Basic", () => {
        const a = Enumerable.flatten(asEnumerable([1, 2, 3])).toArray()
        const b = Enumerable.flatten(asEnumerable<any>([1, [2], "3"])).toArray()
        const c = Enumerable.flatten(asEnumerable([1, [2, 3]])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    it("Shallow", () => {
        const shallow = Enumerable.flatten(asEnumerable([1, [2, [3]]]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
        expect(shallow[2] instanceof Array).toBeTruthy()
        expect((shallow[2] as number[]).length).toBe(1)
        expect((shallow[2] as number[])[0]).toBe(3)
    })

    itAsync("BasicAsync", async () => {
        const a = await AsyncEnumerable.flatten(asAsync([1, 2, 3])).toArray()
        const b = await AsyncEnumerable.flatten(asAsync<any>([1, asAsync([2]), "3"])).toArray()
        const c = await AsyncEnumerable.flatten(asAsync([1, asAsync([2, 3])])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itAsync("ShallowAsync", async () => {
        const shallow = await AsyncEnumerable.flatten(asAsync([1, asAsync([2, asAsync([3])])]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
    })
})

describe("groupBy", () => {
    it("OddEven", () => {
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
    it("ObjectSelect", () => {
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

    it("ObjectSelectWithComparer", () => {
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

    it("SingleKey", () => {
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
    it("IntersectWithEqualityComparer", () => {
        const array = asEnumerable([1, 2, "3"]).intersect(asEnumerable(["1", "2"]), EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("IntersectWithEqualityComparerAsync", async () => {
        const array = await asAsync([1, 2, "3"]).intersect(asAsync(["1", "2"]), EqualityComparer).toArray()

        expect(array).toEqual([1, 2])
    })
})

describe("joinByKey", () => {
    it("basic", () => {
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
})

describe("take", () => {
    it("Take", () => {
        const array = asEnumerable([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    itAsync("TakeAsync", async () => {
        const array = await asAsync([1, 2, 3, 4, 5]).take(2).toArray()

        expect(array).toEqual([1, 2])
    })

    const vals = [1, 2, 3, 4]
    const valsEnum = asEnumerable(vals)
    const valsAsync = asAsync(vals)

    it("various positive amounts", () => {
        expect(valsEnum.take(4).toArray()).toEqual(vals)
        expect(valsEnum.take(1).toArray()).toEqual([1])
        expect(valsEnum.take(2).toArray()).toEqual([1, 2])
    })

    itAsync("various positive amounts async", async () => {
        expect(await valsAsync.take(4).toArray()).toEqual(vals)
        expect(await valsAsync.take(1).toArray()).toEqual([1])
        expect(await valsAsync.take(2).toArray()).toEqual([1, 2])
    })

    it("zero elements", () =>
        expect(valsEnum.take(0).toArray()).toEqual([]))

    itAsync("zero elements async", async () =>
        expect(await valsAsync.take(0).toArray()).toEqual([]))

    it("negative amount", () =>
        expect(valsEnum.take(-1).toArray()).toEqual([]))

    itAsync("negative amount async", async () =>
        expect(await valsAsync.take(-1).toArray()).toEqual([]))
})

describe("takeWhile", () => {
    const vals = [1, 2, 3, 4]

    it("by value", () => {
        expect(asEnumerable(vals).takeWhile((x) => true).toArray()).toEqual(vals)
        expect(asEnumerable(vals).takeWhile((x) => false).toArray()).toEqual([])
        expect(asEnumerable(vals).takeWhile((x) => x !== 3).toArray()).toEqual([1, 2])
    })

    it("by value and index", () => {
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
    it("toArray", () => {
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
    it("toMap", () => {
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
    it("toSet", () => {
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
    it("Last", () => {
        expect(asEnumerable([1, 2]).last()).toBe(2)
    })

    itAsync("LastAsync", async () => {
        expect(await asAsync([1, 2]).last()).toBe(2)
    })

    it("LastEmpty", () => {
        expect(() => asEnumerable([]).last()).toThrowError(InvalidOperationException)
    })

    itAsync("LastEmptyAsync", async () => {
        const expect = await expectAsync(asAsync([]).last())
        expect.toThrowError(InvalidOperationException)
    })

    it("LastPredicate", () => {
        expect(asEnumerable([1, 2]).last((x) => x === 1)).toBe(1)
    })

    itAsync("LastPredicateAsync", async () => {
        expect(await asAsync([1, 2]).last((x) => x === 1)).toBe(1)
    })
})

describe("lastOrDefault", () => {
    it("LastOrDefault", () => {
        expect(asEnumerable([]).lastOrDefault()).toBeNull()
    })

    itAsync("LastOrDefaultAsync", async () => {
        expect(await asAsync([]).lastOrDefault()).toBeNull()
    })

    it("LastOrDefaultPredicate", () => {
        expect(asEnumerable([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
    })

    itAsync("LastOrDefaultPredicateAsync", async () => {
        expect(await asAsync([1, 2, 3]).lastOrDefault((x) => x === 4)).toBeNull()
    })
})

describe("max", () => {
    it("MaxSelectEmptyError", () => {
        expect(() => asEnumerable([] as number[]).max((x) => x * x))
            .toThrowError(InvalidOperationException)
    })

    itAsync("MaxSelectEmptyError", async () => {
        const value = await expectAsync(asAsync([] as number[]).max((x) => x * x))
        value.toThrowError(InvalidOperationException)
    })

    it("MaxSelect", () => {
        expect(asEnumerable([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    itAsync("MaxSelectAsync", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * x)).toBe(9)
    })

    it("Basic", () => expect(asEnumerable([1, 2, 3]).max()).toBe(3))

    itAsync("BasicAsync", async () => expect(await asAsync([1, 2, 3]).max()).toBe(3))

    it("empty array throws exception", () =>
        expect(() => asEnumerable([]).max()).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception async", async () => {
        const value = await expectAsync(asAsync([]).max())
        value.toThrowError(InvalidOperationException)
    })

    it("max with selector", () =>
        expect(asEnumerable([1, 2, 3]).max((x) => x * 2)).toBe(6))

    itAsync("max with selector async", async () => {
        expect(await asAsync([1, 2, 3]).max((x) => x * 2)).toBe(6)
    })

    it("empty array throws exception with selector", () =>
        expect(() => asEnumerable([] as number[]).max((x) => x * 2)).toThrowError(InvalidOperationException))

    itAsync("empty array throws exception with selector async", async () => {
        const expect = await expectAsync(asAsync([] as number[]).max((x) => x * 2))
        expect.toThrowError(InvalidOperationException)
    })
})

describe("min", () => {
    it("Min", () => {
        expect(asEnumerable([1, 2, 3, -7]).min()).toBe(-7)
    })

    itAsync("MinAsync", async () => {
        expect(await asAsync([1, 2, 3, -7]).min()).toBe(-7)
    })

    it("MinEmptyError", () => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("MinEmptyErrorAsync", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    it("MinPredicate Empty Error", () => {
        expect(() => asEnumerable([] as number[]).min((x) => x * x)).toThrowError(InvalidOperationException)
    })

    itAsync("MinPredicate Empty Error Async", async () => {
        const expectMin = await expectAsync(asAsync([] as number[]).min((x) => x * x))
        expectMin.toThrowError(InvalidOperationException)
    })

    it("Min Predicate", () => {
        expect(asEnumerable([1, 2, 3, -7]).min(Math.abs)).toBe(1)
    })

    itAsync("Min Predicate Async", async () => {
        const expectMin = await expectAsync(asAsync([1, 2, 3, -7]).min(Math.abs))
        expectMin.toBe(1)
    })

    it("empty exception", () => {
        expect(() => asEnumerable([]).min()).toThrowError(InvalidOperationException)
    })

    itAsync("empty exception async", async () => {
        const expectMin = await expectAsync(asAsync([]).min())
        expectMin.toThrowError(InvalidOperationException)
    })

    it("empty exception with selector", () => {
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

    it("string", () => {
        expect(asEnumerable(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itAsync("stringAsync", async () => {
        expect(await asAsync(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    it("number", () => {
        expect(asEnumerable(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    it("numberAsync", async () => {
        expect(await asAsync(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    it("object", () => {
        // tslint:disable-next-line:no-construct
        expect(asEnumerable(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itAsync("objectAsync", async () => {
        // tslint:disable-next-line:no-construct
        expect(await asAsync(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    it("boolean", () => {
        expect(asEnumerable(array).ofType("boolean").toArray()).toEqual([true])
    })

    itAsync("booleanAsync", async () => {
        expect(await asAsync(array).ofType("boolean").toArray()).toEqual([true])
    })

    it("Number (Object)", () => {
        expect(asEnumerable(array).ofType(Number).toArray()).toEqual([Number(1)])
    })

    itAsync("Number (Object) Async", async () => {
        expect(await asAsync(array).ofType(Number).toArray()).toEqual([Number(1)])
    })
})

describe("orderBy", () => {
    it("string", () => {
        const vals = asEnumerable(["b", "c", "a"]).orderBy((x) => x).toArray()

        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    it("basic", () => {
        const vals = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.orderBy((x) => x).toArray()).toEqual(vals.toArray())
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderBy((x) => x).toArray()).toEqual(await vals.toArray())
    })
})

describe("orderByDescending", () => {
    it("basic", () => {
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
    it("basic", () => {
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
    it("select parseInt", () => {
        expect(asEnumerable(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    itAsync("select parseInt", async () => {
        expect(await asAsync(["1", "2", "3"]).select(Number.parseInt).toArray()).toEqual([1, 2, 3])
    })

    it("select length", () => {
        expect(asEnumerable(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })

    itAsync("select length", async () => {
        expect(await asAsync(["1", "22", "333"]).select("length").toArray()).toEqual([1, 2, 3])
    })
})

describe("selectMany", () => {
    it("selectMany basic", () => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany basic async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })
})

describe("skip", () => {
    const vals = [1, 2, 3, 4]
    const valsEnum = asEnumerable(vals)
    const valsAsync = asAsync(vals)

    it("first element", () =>
        expect(valsEnum.skip(1).toArray()).toEqual([2, 3, 4]))

    itAsync("first element async", async () =>
        expect(await valsAsync.skip(1).toArray()).toEqual([2, 3, 4]))

    it("first two elements", () =>
        expect(valsEnum.skip(0).toArray()).toEqual(vals))

    itAsync("first two elements async", async () =>
        expect(await valsAsync.skip(0).toArray()).toEqual(vals))

    it("negative value", () =>
        expect(valsEnum.skip(-9).toArray()).toEqual(vals))

    itAsync("negative value async", async () =>
        expect(await valsAsync.skip(-9).toArray()).toEqual(vals))
})

describe("sum", () => {
    it("sum basic", () => {
        expect(asEnumerable([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    itAsync("sum basic async", async () => {
        expect(await asAsync([ 43.68, 1.25, 583.7, 6.5 ]).sum()).toBe(635.13)
    })

    it("sum Selector", () => {
        const zooms = asEnumerable([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(zooms.sum((x) => x.a)).toBe(6)
    })

    itAsync("sum Selector Async", async () => {
        const zooms = asAsync([ { a: 1}, { a: 2 }, {a: 3} ])
        expect(await zooms.sum((x) => x.a)).toBe(6)
    })
})

describe("union", () => {
    it("=== union", () => {
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

    it("== union", () => {
        const ints1 = asEnumerable<string|number>([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asEnumerable([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })

    itAsync("== union async", async () => {
        const ints1: IAsyncEnumerable<string|number> = asAsync([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = asAsync([ "8", "3", "6", "4", "4", "9", "1", "0" ])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.union(ints2, EqualityComparer).toArray()

        expect(union).toEqual(result)
    })
})

describe("where", () => {
    it("item predicate", () => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itAsync("item predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    it("item and index predicate", () => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itAsync("item and index predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    it("where basic", () => {
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
    it("zip basic", () => {
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

    it("zip selector", () => {
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
