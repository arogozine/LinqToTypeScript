import { itEnumerableAsync } from "./../TestHelpers"

describe("asAsync", () => {
    itEnumerableAsync("Basic", async (asIEnumerable) => {
        const values = [1, 2, 3]
        const valuesTwo = await asIEnumerable(values).asAsync().toArray()
        expect(valuesTwo).toEqual(values)
    })
})
