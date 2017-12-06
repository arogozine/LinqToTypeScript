import { asAsync, asParallel, itAsync, itEnumerable } from "../TestHelpers";

describe("joinByKey", () => {
    itEnumerable<number>("basic", (asEnumerable) => {
        const joinBy = asEnumerable([1, 2, 3]).joinByKey(asEnumerable([1, 2, 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ))
            .toArray()

        expect(joinBy.length).toBe(3)
        expect(joinBy[0].x).toBe(1)
        expect(joinBy[1].x).toBe(2)
        expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x).toBe(joinBy[0].y)
        expect(joinBy[1].x).toBe(joinBy[1].y)
        expect(joinBy[2].x).toBe(joinBy[2].y)
    })

    itAsync("BasicAsync", async () => {
        const joinBy = await asAsync([1, 2, 3]).joinByKey(asAsync([1, 2, 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ))
            .toArray()

        expect(joinBy.length).toBe(3)
        expect(joinBy[0].x).toBe(1)
        expect(joinBy[1].x).toBe(2)
        expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x).toBe(joinBy[0].y)
        expect(joinBy[1].x).toBe(joinBy[1].y)
        expect(joinBy[2].x).toBe(joinBy[2].y)
    })

    itAsync("BasicParallel", async () => {
        const joinBy = await asParallel([1, 2, 3]).joinByKey(asAsync([1, 2, 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ))
            .toArray()

        expect(joinBy.length).toBe(3)
        expect(joinBy[0].x).toBe(1)
        expect(joinBy[1].x).toBe(2)
        expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x).toBe(joinBy[0].y)
        expect(joinBy[1].x).toBe(joinBy[1].y)
        expect(joinBy[2].x).toBe(joinBy[2].y)
    })

    // TODO: Comparer
})
