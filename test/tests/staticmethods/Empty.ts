import { AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src"
import { itAsync } from "../../TestHelpers"

describe("empty", () => {
    it("sync", () => {
        for (const _ of Enumerable.empty<any>()) {
            fail()
        }
    })

    itAsync("async", async () => {
        for await (const _ of AsyncEnumerable.empty<any>()) {
            fail()
        }
    })

    itAsync("parallel", async () => {
        for await (const _ of ParallelEnumerable.empty<any>()) {
            fail()
        }
    })
})
