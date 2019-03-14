import { isParallelEnumerable } from "linq-to-typescript"
import { asAsync, itParallel } from "../../TestHelpers"

describe("isParallelEnumerable", () => {
    it("Not Parallel Enumerable", () => {
        expect(isParallelEnumerable(undefined)).toBe(false)
        expect(isParallelEnumerable(null)).toBe(false)
        expect(isParallelEnumerable(1)).toBe(false)
        expect(isParallelEnumerable({})).toBe(false)
    })

    itParallel("Is Parallel Enumerable", (asParallel) => {
        const expectTrue = isParallelEnumerable(asParallel([]))
        expect(expectTrue).toBe(true)
    })

    it("Is Not Enumerable", () => {
        expect(isParallelEnumerable(new Array())).toBe(false)
        expect(isParallelEnumerable(new Map())).toBe(false)
        expect(isParallelEnumerable(new Set())).toBe(false)
        // tslint:disable-next-line:no-construct
        expect(isParallelEnumerable(new String())).toBe(false)
        expect(isParallelEnumerable(new Int8Array(1))).toBe(false)
        expect(isParallelEnumerable(new Int16Array(1))).toBe(false)
        expect(isParallelEnumerable(new Int32Array(1))).toBe(false)
        expect(isParallelEnumerable(new Uint8Array(1))).toBe(false)
        expect(isParallelEnumerable(new Uint8ClampedArray(1))).toBe(false)
        expect(isParallelEnumerable(new Uint16Array(1))).toBe(false)
        expect(isParallelEnumerable(new Uint32Array(1))).toBe(false)
        expect(isParallelEnumerable(new Float32Array(1))).toBe(false)
        expect(isParallelEnumerable(new Float64Array(1))).toBe(false)
    })

    it("Not Async", () => {
        expect(isParallelEnumerable(asAsync([]))).toBe(false)
    })
})
