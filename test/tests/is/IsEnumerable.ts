import { isEnumerable, IEnumerable } from "../../../src/index"
import { itEnumerable } from "../../TestHelpers"

describe("isEnumerable", () => {
    it("Not Enumerable", () => {
        expect(isEnumerable(undefined)).toBe(false)
        expect(isEnumerable(null)).toBe(false)
        // expect(isEnumerable("Pie")).toBe(false)
        expect(isEnumerable(1)).toBe(false)
        expect(isEnumerable({})).toBe(false)
    })

    itEnumerable("Is Enumerable", (asEnumerable) => {
        expect(isEnumerable(asEnumerable([]))).toBe(true)
    })

    it("String Is LiNQ Bound", () => {
        const arr = (("Test123" as any) as IEnumerable<string>).select((x) => x).toArray()
        console.log(arr)
    })
})
