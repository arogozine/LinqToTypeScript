import { AsyncEnumerable, Enumerable } from "../../../src/index"
import { itAsync } from "../../TestHelpers"

describe("enumerateObject", () => {
    it("EnumerateObject", () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for (const item of Enumerable.enumerateObject(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })

    itAsync("AsyncEnumerateObject", async () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for await (const item of AsyncEnumerable.enumerateObject(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })
})
