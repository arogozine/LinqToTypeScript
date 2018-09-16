import { flatten as flattenAsync } from "../../../src/async/async"
import { ParallelEnumerable } from "../../../src/index"
import { flatten } from "../../../src/sync/sync"
import { asAsync, itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("flatten", () => {
    itEnumerable<any>("Basic", (asEnumerable) => {
        const a = flatten(asEnumerable([1, 2, 3])).toArray()
        const b = flatten(asEnumerable([1, [2], "3"])).toArray()
        const c = flatten(asEnumerable([1, [2, 3]])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itAsync("Basic", async () => {
        const a = await flattenAsync(asAsync<any>([1, 2, 3])).toArray()
        const b = await flattenAsync(asAsync<any>([1, asAsync([2]), "3"])).toArray()
        const c = await flattenAsync(asAsync([1, asAsync([2, 3])])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itParallel<any>("Basic", async (asParallel) => {
        const a = await ParallelEnumerable.flatten(asParallel([1, 2, 3])).toArray()
        const b = await ParallelEnumerable.flatten(asParallel([1, asAsync([2]), "3"])).toArray()
        const c = await ParallelEnumerable.flatten(asParallel([1, asAsync([2, 3])])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itEnumerable<any>("Shallow", (asEnumerable) => {
        const shallow = flatten(asEnumerable([1, [2, [3]]]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
        expect(shallow[2] instanceof Array).toBeTruthy()
        expect((shallow[2] as number[]).length).toBe(1)
        expect((shallow[2] as number[])[0]).toBe(3)
    })

    itAsync("Shallow", async () => {
        const shallow = await flattenAsync(asAsync<any>([1, asAsync([2, asAsync([3])])]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
    })

    itParallel<any>("Shallow", async (asParallel) => {
        const shallow = await ParallelEnumerable.flatten(
            asParallel([1, asParallel([2, asParallel([3])])]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
    })
})
