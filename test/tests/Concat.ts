import { ArrayEnumerable } from "../../src/index";
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers";

describe("concat", () => {
    itEnumerable("handles two empty arrays", (asEnumerable) =>
        expect(asEnumerable([]).concat(asEnumerable([])).toArray()).toEqual([]))

    itAsync("handles two empty arrays async", async () => {
        const value = await asAsync([]).concat(asAsync([])).toArray()
        expect(value).toEqual([])
    })

    itAsync("handles two empty arrays parallel", async () => {
        const value = await asParallel([]).concat(asParallel([])).toArray()
        expect(value).toEqual([])
    })

    it("handles calling array being empty", () =>
        expect(([] as number[]).concat([1])).toEqual([1]))

    itAsync("handles calling array being empty async", async () => {
        const value = await asAsync([] as number[]).concat(asAsync([1])).toArray()
        expect(value).toEqual([1])
    })

    itAsync("handles calling array being empty parallel", async () => {
        const value = await asParallel([] as number[]).concat(asParallel([1])).toArray()
        expect(value).toEqual([1])
    })

    itEnumerable("handles concat with empty array", (asEnumerable) =>
        expect(asEnumerable([2]).concat(asEnumerable([])).toArray()).toEqual([2]))

    itAsync("handles concat with empty array async", async () => {
        const value = await asAsync([2]).concat(asAsync([])).toArray()
        expect(value).toEqual([2])
    })

    itAsync("handles concat with empty array parallel", async () => {
        const value = await asParallel([2]).concat(asParallel([])).toArray()
        expect(value).toEqual([2])
    })

    itEnumerable("handle two arrays concat", (asEnumerable) =>
        expect(asEnumerable([1]).concat(asEnumerable([2, 3])).toArray()).toEqual([1, 2, 3]))

    itAsync("handle two arrays concat async", async () => {
        const value = await asAsync([1]).concat(asAsync([2, 3])).toArray()
        expect(value).toEqual([1, 2, 3])
    })

    itAsync("handle two arrays concat parallel", async () => {
        const value = await asParallel([1]).concat(asParallel([2, 3])).toArray()
        expect(value).toEqual([1, 2, 3])
    })

    it("ArrayEnumerable Concat", () => {
        const a = new ArrayEnumerable(1, 2)
        expect(a.concat(3)).toEqual([1, 2, 3])
    })
})
