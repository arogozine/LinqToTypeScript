import { AsyncEnumerable, Enumerable } from "index"
import { itAsync } from "../TestHelpers"

describe("empty", () => {
    it("sync", () => {
        for (const value of Enumerable.empty<any>()) {
            fail()
        }
    })

    itAsync("async", async () => {
        for await (const value of AsyncEnumerable.empty<any>()) {
            fail()
        }
    })
})
