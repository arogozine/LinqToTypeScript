import { AsyncEnumerable, Enumerable, ParallelEnumerable } from "../../../src"
import { itAsync } from "../../TestHelpers"

describe("empty", () => {
    it("Empty", () => {
        for (const _ of Enumerable.empty<any>()) {
            fail()
        }
    })

    itAsync("Empty", async () => {
        for await (const _ of AsyncEnumerable.empty<any>()) {
            fail()
        }
    })

    itAsync("Paralell Empty", async () => {
        for await (const _ of ParallelEnumerable.empty<any>()) {
            fail()
        }
    })
})
