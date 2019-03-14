import { isAsyncEnumerable } from "linq-to-typescript"
import { asAsync, itParallel } from "../../TestHelpers"

describe("isAsyncEnumerable", () => {
    it("Not Async Enumerable", () => {
        expect(isAsyncEnumerable(undefined)).toBe(false)
        expect(isAsyncEnumerable(null)).toBe(false)
        expect(isAsyncEnumerable(1)).toBe(false)
        expect(isAsyncEnumerable({})).toBe(false)
    })

    it("Is Async Enumerable", () => {
        const expectTrue = isAsyncEnumerable(asAsync([]))
        expect(expectTrue).toBe(true)
    })

    it("Is Not Enumerable", () => {
        expect(isAsyncEnumerable(new Array())).toBe(false)
        expect(isAsyncEnumerable(new Map())).toBe(false)
        expect(isAsyncEnumerable(new Set())).toBe(false)
        // tslint:disable-next-line:no-construct
        expect(isAsyncEnumerable(new String())).toBe(false)
        expect(isAsyncEnumerable(new Int8Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Int16Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Int32Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Uint8Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Uint8ClampedArray(1))).toBe(false)
        expect(isAsyncEnumerable(new Uint16Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Uint32Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Float32Array(1))).toBe(false)
        expect(isAsyncEnumerable(new Float64Array(1))).toBe(false)
    })

    itParallel("Not", (asParallel) => {
        expect(isAsyncEnumerable(asParallel([]))).toBe(false)
    })
})
