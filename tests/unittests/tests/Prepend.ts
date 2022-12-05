import { itEnumerable } from "../TestHelpers";

describe("Prepend", () => {
    itEnumerable<number>("Empty", (asEnumerable) => {
        const appendArray = asEnumerable([]).prepend(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itEnumerable<number>("Not Empty", (asEnumerable) => {
        const appendArray = asEnumerable([2, 3]).prepend(1).toArray()
        expect(appendArray).toEqual([1, 2, 3])
    })
})