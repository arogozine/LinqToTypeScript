import { empty as emptyAsync } from "async/async"
import { empty } from "sync/sync"
import { empty as emptyParallel } from "../../../src/parallel/parallel"
import { itAsync, itEnumerable, itParallel } from "../../TestHelpers"

describe("empty", () => {
    itEnumerable("Empty", () => {
        for (const _ of empty<any>()) {
            fail()
        }
    })

    itAsync("Empty", async () => {
        for await (const _ of emptyAsync<any>()) {
            fail()
        }
    })

    itParallel("Empty", async () => {
        for await (const _ of emptyParallel<any>()) {
            fail()
        }
    })
})
