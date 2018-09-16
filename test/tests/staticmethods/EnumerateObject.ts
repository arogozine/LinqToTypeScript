import { enumerateObject as enumerateObjectAsync } from "async/async"
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
            expect(item.second).toBe(object[item.first])
        }
    })

    itAsync("EnumerateObject", async () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for await (const item of enumerateObjectAsync(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })

    // TODO: Parallel
})
