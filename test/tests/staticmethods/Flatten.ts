import { AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src/index"
import { asAsync, itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("flatten", () => {
    itEnumerable<any>("Basic", (asEnumerable) => {
        const a = Enumerable.flatten(asEnumerable([1, 2, 3])).toArray()
        const b = Enumerable.flatten(asEnumerable([1, [2], "3"])).toArray()
        const c = Enumerable.flatten(asEnumerable([1, [2, 3]])).toArray()
        expect(a).toEqual([1, 2, 3])
        expect(b).toEqual([1, 2, "3"])
        expect(c).toEqual([1, 2, 3])
    })

    itAsync("BasicAsync", async () => {
        const a = await AsyncEnumerable.flatten(asAsync<any>([1, 2, 3])).toArray()
        const b = await AsyncEnumerable.flatten(asAsync<any>([1, asAsync([2]), "3"])).toArray()
        const c = await AsyncEnumerable.flatten(asAsync([1, asAsync([2, 3])])).toArray()
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
        const shallow = Enumerable.flatten(asEnumerable([1, [2, [3]]]), true).toArray()
        expect(shallow.length).toBe(3)
        expect(shallow[0]).toBe(1)
        expect(shallow[1]).toBe(2)
        expect(shallow[2] instanceof Array).toBeTruthy()
        expect((shallow[2] as number[]).length).toBe(1)
        expect((shallow[2] as number[])[0]).toBe(3)
    })

    itAsync("ShallowAsync", async () => {
        const shallow = await AsyncEnumerable.flatten(asAsync<any>([1, asAsync([2, asAsync([3])])]), true).toArray()
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
