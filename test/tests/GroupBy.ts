import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("groupBy", () => {
    itEnumerable("OddEven", (asEnumerable) => {
        const groupBy = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9]).groupBy((x) => x % 2)
        for (const group of groupBy) {
            expect(group.key === 0 || group.key === 1).toBe(true)
            if (group.key === 0) {
                expect(group.toArray()).toEqual([2, 4, 6, 8])
            } else {
                expect(group.toArray()).toEqual([1, 3, 5, 7, 9])
            }
        }
    })

    itAsync("OddEvenAsync", async () => {
        const groupBy = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]).groupBy((x) => x % 2)
        for await (const group of groupBy) {
            expect(group.key === 0 || group.key === 1).toBe(true)
            if (group.key === 0) {
                expect(group.toArray()).toEqual([2, 4, 6, 8])
            } else {
                expect(group.toArray()).toEqual([1, 3, 5, 7, 9])
            }
        }
    })

    itParallel("OddEvenParallel", async (asParallel) => {
        const groupBy = asParallel([1, 2, 3, 4, 5, 6, 7, 8, 9]).groupBy((x) => x % 2)
        for await (const group of groupBy) {
            expect(group.key === 0 || group.key === 1).toBe(true)
            if (group.key === 0) {
                expect(group.toArray()).toEqual([2, 4, 6, 8])
            } else {
                expect(group.toArray()).toEqual([1, 3, 5, 7, 9])
            }
        }
    })
})
