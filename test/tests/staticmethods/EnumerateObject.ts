import { enumerateObject as enumerateObjectAsync } from "async"
import { enumerateObject } from "sync/sync"
import { itAsync, itEnumerable } from "../../TestHelpers"

describe("enumerateObject", () => {
    itEnumerable("EnumerateObject", () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for (const item of enumerateObject(object)) {
            expect(item[1]).toBe(object[item[0]])
        }
    })

    itAsync("EnumerateObject", async () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for await (const item of enumerateObjectAsync(object)) {
            expect(item[1]).toBe(object[item[0]])
        }
    })

    // TODO: Parallel
})
