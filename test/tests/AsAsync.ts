import { itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("AsAsync", () => {
    itEnumerableAsync("IEnumerable", async (asIEnumerable) => {
        const values = [1, 2, 3]
        const valuesTwo = await asIEnumerable(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })

    itParallel("IParallelEnumerable", async (asParallel) => {
        const values = [1, 2, 3]
        const valuesTwo = await asParallel(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })
})
