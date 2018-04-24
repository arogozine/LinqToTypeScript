import { asParallel, itAsync, itEnumerableAsync } from "./../TestHelpers"

describe("asAsync", () => {
    itEnumerableAsync("IEnumerable", async (asIEnumerable) => {
        const values = [1, 2, 3]
        const valuesTwo = await asIEnumerable(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })

    itAsync("IParallelEnumerable", async () => {
        const values = [1, 2, 3]
        const valuesTwo = await asParallel(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })
})
