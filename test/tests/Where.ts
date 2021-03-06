import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

describe("where", () => {
    it("String", () => {
        expect("alphabetagamma".where(c => c === "a").toArray()).toEqual(["a", "a", "a", "a", "a"])
    })

    it("String Index", () => {
        expect("alphabetagamma".where((_, i) => i === 5).toArray()).toEqual(["b"])
    })

    itEnumerable("item predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itAsync("item predicate", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itParallel("item predicate", async (asParallel) => {
        const vals = asParallel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((x) => x > 8).toArray()).toEqual([9])
    })

    itEnumerable("item and index predicate", (asEnumerable) => {
        const vals = asEnumerable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(vals.where((_x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itAsync("item and index predicate", async () => {
        const vals = asAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((_x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itParallel("item and index predicate", async (asParallel) => {
        const vals = asParallel([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(await vals.where((_x: number, i: number) => i === 9).toArray()).toEqual([9])
    })

    itEnumerable<string>("where basic", (asEnumerable) => {
        const stuff = asEnumerable([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = stuff
            .where((_: string, i: number) => i !== stuff.count() - 1)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })

    itAsync("where basic", async () => {
        const stuff = asAsync([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = await stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = await stuff
            .where((_x: string, i: number) => i !== 4)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })

    itParallel<string>("where basic", async (asParallel) => {
        const stuff = asParallel([ "", "1", "2", "foo", "bar" ])
        const noEmptyStrings = await stuff.where((x) => x !== "").toArray()

        expect(noEmptyStrings).toEqual([ "1", "2", "foo", "bar" ])

        const noBar = await stuff
            .where((_x: string, i: number) => i !== 4)
            .toArray()

        expect(noBar).toEqual([ "", "1", "2", "foo" ])
    })
})
