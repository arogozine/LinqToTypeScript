import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("average", () => {
    itEnumerable("basic", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average()).toBe(5))

    itAsync("basic", async () =>
        expect(await asAsync([0, 10]).average()).toBe(5))

    itParallel("basic", async (asParallel) =>
        expect(await asParallel([0, 10]).average()).toBe(5))

    itEnumerable("EmptyThrowsException", (asEnumerable) =>
        expect(() => asEnumerable([]).average()).toThrowError(InvalidOperationException))

    itAsync("EmptyThrowsException", async () => {
        const expect = await expectAsync(asAsync([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("EmptyThrowsException", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).average())
        expect.toThrowError(InvalidOperationException)
    })

    itEnumerable("selector", (asEnumerable) =>
        expect(asEnumerable([0, 10]).average((x) => x * 10)).toBe(50))

    itAsync("selector", async () =>
        expect(await asAsync([0, 10]).average((x) => x * 10)).toBe(50))

    itParallel("selector", async (asParallel) =>
        expect(await asParallel([0, 10]).average((x) => x * 10)).toBe(50))

    itEnumerable("empty array with selector throws exception",
        (asEnumerable) => expect(
            () => asEnumerable([] as number[]).average((x) => x * 10)).toThrowError(InvalidOperationException))

    itAsync("empty array with selector throws exception", async () => {
        const expect = await expectAsync((asAsync([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })

    itParallel("empty array with selector throws exception", async (asParallel) => {
        const expect = await expectAsync((asParallel([] as number[])).average((x) => x * 10))
        expect.toThrowError(InvalidOperationException)
    })

    //#region Zero Array

    itEnumerable("Zero Array", async (asEnumerable) => {
        const avg = asEnumerable([0, 0]).average()
        expect(avg).toBe(0)

        const avg2 = asEnumerable([0, 0]).average((x) => x * 2)
        expect(avg2).toBe(0)
    })

    itAsync("Zero Array", async () => {
        const avg = await asAsync([0, 0]).average()
        expect(avg).toBe(0)

        const avg2 = await asAsync([0, 0]).average((x) => x * 2)
        expect(avg2).toBe(0)
    })

    itParallel("Zero Array", async (asParallel) => {
        const avg = await asParallel([0, 0]).average()
        expect(avg).toBe(0)

        const avg2 = await asParallel([0, 0]).average((x) => x * 2)
        expect(avg2).toBe(0)
    })

    //#endregion
})
