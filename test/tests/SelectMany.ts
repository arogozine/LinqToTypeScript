import { asAsync, itAsync, itEnumerable, asParallel } from "../TestHelpers"

describe("selectMany", () => {
    itEnumerable<{ a: number[] }>("selectMany basic", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itEnumerable<{ a: number[] }>("selectMany string", (asEnumerable) => {
        const values = asEnumerable([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany basic async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany string async", async () => {
        const values = asAsync([
            { a: [1, 2]},
            { a: [3, 4]},
        ] as Array<{ a: Iterable<number> }>)

        expect(await values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany basic parallel", async () => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        expect(await values.selectMany((x) => x.a).toArray()).toEqual([1, 2, 3, 4])
    })

    itAsync("selectMany string parallel", async () => {
        const values = asParallel([
            { a: [1, 2]},
            { a: [3, 4]},
        ] as Array<{ a: Iterable<number> }>)

        expect(await values.selectMany("a").toArray()).toEqual([1, 2, 3, 4])
    })

})
