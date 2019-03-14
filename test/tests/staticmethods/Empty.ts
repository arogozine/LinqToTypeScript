import { empty as emptyAsync } from "linq-to-typescript/async"
import { empty as emptyParallel } from "linq-to-typescript/parallel"
import { empty } from "linq-to-typescript/sync"
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
