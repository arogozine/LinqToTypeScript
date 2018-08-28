import { AsyncEnumerable, empty, ParallelEnumerable } from "../../../src"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("empty", () => {
    itEnumerable("Empty", () => {
        for (const _ of empty<any>()) {
            fail()
        }
    })

    itAsync("Empty", async () => {
        for await (const _ of AsyncEnumerable.empty<any>()) {
            fail()
        }
    })

    itParallel("Empty", async () => {
        for await (const _ of ParallelEnumerable.empty<any>()) {
            fail()
        }
    })
})
