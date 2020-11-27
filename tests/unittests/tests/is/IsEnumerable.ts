import { isEnumerable } from "linq-to-typescript"
import { asAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("isEnumerable", () => {

    it("Not Enumerable", () => {
        expect(isEnumerable(undefined)).toBe(false)
        expect(isEnumerable(null)).toBe(false)
        expect(isEnumerable(1)).toBe(false)
        expect(isEnumerable({})).toBe(false)
    })

    itEnumerable("Is Enumerable", (asEnumerable) => {
        const expectTrue = isEnumerable(asEnumerable([]))
        expect(expectTrue).toBe(true)
    })

    it("Is Enumerable Types", () => {
        expect(isEnumerable(new Array())).toBe(true)
        expect(isEnumerable(new Map())).toBe(true)
        expect(isEnumerable(new Set())).toBe(true)
        // tslint:disable-next-line:no-construct
        expect(isEnumerable(new String())).toBe(true)
        expect(isEnumerable(new Int8Array(1))).toBe(true)
        expect(isEnumerable(new Int16Array(1))).toBe(true)
        expect(isEnumerable(new Int32Array(1))).toBe(true)
        expect(isEnumerable(new Uint8Array(1))).toBe(true)
        expect(isEnumerable(new Uint8ClampedArray(1))).toBe(true)
        expect(isEnumerable(new Uint16Array(1))).toBe(true)
        expect(isEnumerable(new Uint32Array(1))).toBe(true)
        expect(isEnumerable(new Float32Array(1))).toBe(true)
        expect(isEnumerable(new Float64Array(1))).toBe(true)
    })

    it("Not Async", () => {
        expect(isEnumerable(asAsync([]))).toBe(false)
    })

    itParallel("Not", (asParallel) => {
        expect(isEnumerable(asParallel([]))).toBe(false)
    })
})
