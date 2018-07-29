import { InvalidOperationException } from "../../src/index"

import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("firstOrDefault", () => {
    itEnumerable("Basic", (asEnumerable) => {
        expect(asEnumerable([1, 2]).firstOrDefault()).toBe(1)
    })

    itAsync("Basic", async () => {
        expect(await asAsync([1, 2]).firstOrDefault()).toBe(1)
    })

    itParallel("Basic", async (asParallel) => {
        expect(await asParallel([1, 2]).firstOrDefault()).toBe(1)
    })

    itEnumerable("FirstPredicate", (asEnumerable) => {
        expect(asEnumerable([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itAsync("FirstPredicate", async () => {
        expect(await asAsync([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itParallel("FirstPredicate", async (asParallel) => {
        expect(await asParallel([1, 2]).firstOrDefault((x) => x === 2)).toBe(2)
    })

    itEnumerable("FirstOrDefaultEmpty", (asEnumerable) =>  {
        expect(asEnumerable([]).firstOrDefault()).toBeNull()
    })

    itAsync("FirstOrDefaultEmpty", async () =>  {
        (await expectAsync(asAsync([]).firstOrDefault())).toBeNull()
    })

    itParallel("FirstOrDefaultEmpty", async (asParallel) =>  {
        (await expectAsync(asParallel([]).firstOrDefault())).toBeNull()
    })
})
