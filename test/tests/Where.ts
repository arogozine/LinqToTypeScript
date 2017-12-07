import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers"

describe("where", () => {
    itEnumerable("item predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itAsync("item predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itAsync("item predicate parallel", async () => {
        const vals = asParallel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itEnumerable("item and index predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itAsync("item and index predicate async", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itAsync("item and index predicate parallel", async () => {
        const vals = asParallel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itEnumerable<string>("where basic", (asEnumerable) => {
        const stuff = asEnumerable([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = stuff
            .where((x: string, i: number) => i !== stuff.count() - 1)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })

    itAsync("where basic async", async () => {
        const stuff = asAsync([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = await stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = await stuff
            .where((x: string, i: number) => i !== 4)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })

    itAsync("where basic parallel", async () => {
        const stuff = asParallel([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = await stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = await stuff
            .where((x: string, i: number) => i !== 4)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })
})
