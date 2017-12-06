import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("orderBy", () => {
    itEnumerable<string>("string", (asEnumerable) => {
        const vals = asEnumerable(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringParallel", async () => {
        const vals = await asParallel(["b", "c", "a"]).orderBy((x) => x).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerable("basic", (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.orderBy((x) => x).toArray()).toEqual(vals.toArray())
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderBy((x) => x).toArray()).toEqual(await vals.toArray())
    })

    itAsync("basicParallel", async () => {
        const vals = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderBy((x) => x).toArray()).toEqual(await vals.toArray())
    })
})
