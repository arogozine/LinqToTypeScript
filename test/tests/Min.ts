import { InvalidOperationException } from "../../src/index"
import { asAsync, expectAsync, itAsync, itEnumerable } from "../TestHelpers"

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
