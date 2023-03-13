import { itEnumerable } from "../TestHelpers";

describe("Append", () => {
    itEnumerable<number>("Empty", (asEnumerable) => {
        const appendArray = asEnumerable([]).append(1).toArray()
        expect(appendArray).toEqual([1])
    })

    itEnumerable<number>("Not Empty", (asEnumerable) => {
        const appendArray = asEnumerable([2, 3]).append(1).toArray()
        expect(appendArray).toEqual([2, 3, 1])
    })
})