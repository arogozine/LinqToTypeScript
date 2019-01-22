import { empty as emptyAsync } from "../../../src/async"
import { empty as emptyParallel } from "../../../src/parallel"
import { empty } from "../../../src/sync"
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
