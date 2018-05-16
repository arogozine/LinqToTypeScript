import { InvalidOperationException } from "./../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "./../TestHelpers"

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

    itParallel<string>("BasicParallel", async (asParallel) => {
        const asyncArray = asParallel(["f", "o", "o"])
        expect(await asyncArray.aggregate((x, y) => x + y)).toBe("foo")
        const sentence = "the quick brown fox jumps over the lazy dog"

        // Split the string into individual words.
        const words = asParallel(sentence.split(" "))
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

    itParallel<string>("ResultSelectorParallel", async (asParallel) => {
        const fruits = asParallel([ "apple", "mango", "orange", "passionfruit", "grape" ])

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

    itParallel<number>("SingleValueParallel", async (asParallel) => {
        const val2 = await asParallel([1]).aggregate((x, y) => x + y)
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

    itParallel<number>("MultipleValuesParallel", async (asParallel) => {
        const val = await asParallel([1, 2, 3]).aggregate((x, y) => x + y)
        expect(val).toBe(6)
    })

    itEnumerable<any>("Exception", (asEnumerable) => {
        expect(() => asEnumerable([]).aggregate((x, y) => x + y)).toThrowError(InvalidOperationException)
    })

    itAsync("ExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([]).aggregate((x, y) => x + y))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel<number>("ExceptionParallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).aggregate((x, y) => x + y))
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

    itParallel("Aggregate2Parallel", async (asParallel) => {
        const val = await asParallel([1, 2, 3]).aggregate(4, (x, y) => x + y)
        expect(val).toBe(10)

        const val2 = await asParallel([1]).aggregate(9, (x, y) => x + y)
        expect(val2).toBe(10)

        const val3 = await asParallel([] as number[]).aggregate(10, (x, y) => x + y)
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

    itParallel("Aggregate3Parallel", async (asParallel) => {
        const val = await asParallel([1, 2, 3]).aggregate(4, (x, y) => x + y, (acc) => acc * 10)
        expect(val).toBe(100)
    })
})
