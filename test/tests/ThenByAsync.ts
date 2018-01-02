import { Enumerable } from "../../src/index"
import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"
/*
describe("thenByAsync", () => {
    itEnumerable<string>("string", (asEnumerable) => {
        const vals = asEnumerable(["b", "c", "a"]).orderBy((x) => x)
        let i = 0
        const thenBy = Enumerable.thenByAsync(vals, async (x) => await i++)
        expect(thenBy).toBeDefined()
    })
})
*/
