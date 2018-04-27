import { InvalidOperationException } from "../../src/index"

import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("firstOrDefault", () => {

    itEnumerable("FirstPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicateAsync", async () => {
        expect(await asAsync([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicateParallel", async (asParallel) => {
        expect(await asParallel([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itEnumerable("FirstOrDefaultEmpty", (asEnumerable) =>  {
        expect(asEnumerable([]).firstOrDefault()).toBeNull()
    })

    itAsync("FirstOrDefaultEmptyAsync", async () =>  {
        (await expectAsync(asAsync([]).firstOrDefault())).toBeNull()
    })

    itParallel("FirstOrDefaultEmptyParallel", async (asParallel) =>  {
        (await expectAsync(asParallel([]).firstOrDefault())).toBeNull()
    })
})
