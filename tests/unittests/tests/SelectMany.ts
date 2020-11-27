import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("selectMany", () => {
    itEnumerable<{ a: number[] }>("selectMany basic", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
        expect(values.selectMany((x, _) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany basic", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
        expect(await values.selectMany((x, _) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itParallel<{ a: Iterable<number> }>("selectMany basic", async (asParallel) => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
        expect(await values.selectMany((x, _) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itEnumerable<{ a: number[] }>("selectMany string", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany string", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ] as Array<{ a: Iterable<number> }>)

        expect(await values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itParallel<{ a: Iterable<number> }>("selectMany string", async (asParallel) => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ] as Array<{ a: Iterable<number> }>)

        expect(await values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itEnumerable("proper index", (asEnumerable) => {
        const indexArray = asEnumerable([2, 1, 0]).selectMany((_, index) => [index]).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })

    itAsync("proper index", async () => {
        const indexArray = await asAsync([2, 1, 0]).selectMany((_, index) => [index]).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })

    itParallel("proper index", async (asParallel) => {
        const indexArray = await asParallel([2, 1, 0]).selectMany((_, index) => [index]).toArray()
        expect(indexArray).toEqual([0, 1, 2])
    })

})
