import { itEnumerable } from "../TestHelpers"

describe("orderDescending", () => {
    const unsorted = [9, 8, 7, 6, 5, 5, 4, 3, 9, 1, 0]
    const sorted = [9, 9, 8, 7, 6, 5, 5, 4, 3, 1, 0]

    itEnumerable("Basic", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderDescending().toArray()).toEqual(sorted)
    })

    //#region With Comparer

    const comparer = (x: number, y: number) => x - y

    itEnumerable("With Comparer", (asEnumerable) => {
        const vals = asEnumerable(unsorted)
        expect(vals.orderDescending(comparer).toArray()).toEqual(sorted)
    })

    //#endregion
})
