import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("average", () => {
    itEnumerable("basic", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average()).toBe(5))

    itAsync("basicAsync", async () =>
        expect(await asAsync([0, 10]).average()).toBe(5))

    itParallel("basicParallel", async (asParallel) =>
        expect(await asParallel([0, 10]).average()).toBe(5))

    itEnumerable("EmptyThrowsException", (asEnumerable) =>
        expect(() => asEnumerable([]).average()).toThrowError(InvalidOperationException))

    itAsync("EmptyThrowsExceptionAsync", async () => {
        const expect = await expectAsync(asAsync([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("EmptyThrowsExceptionParallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("selector", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average((x) => x * 10)).toBe(50))

    itAsync("selectorAsync", async () =>
        expect(await asAsync([0, 10]).average((x) => x * 10)).toBe(50))

    itParallel("selectorParallel", async (asParallel) =>
        expect(await asParallel([0, 10]).average((x) => x * 10)).toBe(50))

    itEnumerable("empty array with selector throws exception",
        (asEnumerable) => expect(
            () => asEnumerable([] as number[]).average((x) => x * 10)).toThrowError(InvalidOperationException))

    itAsync("empty array with selector throws exception Async", async () => {
        const expect = await expectAsync((asAsync([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array with selector throws exception Parallel", async (asParallel) => {
        const expect = await expectAsync((asParallel([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })
})
