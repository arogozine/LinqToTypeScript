import { asAsync, asPromise, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("orderByAsync", () => {
    itEnumerableAsync<string>("string", async (asEnumerable) => {
        const vals = await asEnumerable(["b", "c", "a"]).orderByAsync((x) => asPromise(x)).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itAsync("StringAsync", async () => {
        const vals = await asAsync(["b", "c", "a"]).orderByAsync((x) => asPromise(x)).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itParallel<string>("StringParallel", async (asParallel) => {
        const vals = await asParallel(["b", "c", "a"]).orderByAsync((x) => asPromise(x)).toArray()
        expect(vals).toEqual(["a", "b", "c"])
    })

    itEnumerableAsync("basic", async (asEnumerable) => {
        const vals = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderByAsync((x) => asPromise(x)).toArray()).toEqual(vals.toArray())
    })

    itAsync("basicAsync", async () => {
        const vals = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderByAsync((x) => asPromise(x)).toArray()).toEqual(await vals.toArray())
    })

    itParallel("basicParallel", async (asParallel) => {
        const vals = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.orderByAsync((x) => asPromise(x)).toArray()).toEqual(await vals.toArray())
    })
})
