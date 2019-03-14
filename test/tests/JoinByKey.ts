import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"
import { EqualityComparer } from "linq-to-typescript"

describe("joinByKey", () => {
    itEnumerable("basic", (asEnumerable) => {
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

    itAsync("basic", async () => {
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

    itParallel("basic", async (asParallel) => {
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

    // tslint:disable:triple-equals

    itEnumerable<string | number>("With Comparer", (asEnumerable) => {
        const joinBy = asEnumerable(["1", 2, 3]).joinByKey(asEnumerable([1, "2", 3]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ),
            EqualityComparer)
            .toArray()

        expect(joinBy.length).toBe(3)
        // expect(joinBy[0].x).toBe(1)
        // expect(joinBy[1].x).toBe(2)
        // expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x == joinBy[0].y)
        expect(joinBy[1].x == joinBy[1].y)
        expect(joinBy[2].x == joinBy[2].y)
    })

    itAsync("With Comparer", async () => {
        const joinBy = await asAsync([1, "2", 3]).joinByKey(asAsync([1, 2, "3"]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ),
            EqualityComparer)
            .toArray()

        expect(joinBy.length).toBe(3)
        // expect(joinBy[0].x).toBe(1)
        // expect(joinBy[1].x).toBe(2)
        // expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x == joinBy[0].y)
        expect(joinBy[1].x == joinBy[1].y)
        expect(joinBy[2].x == joinBy[2].y)
    })

    itParallel<string | number>("With Comparer", async (asParallel) => {
        const joinBy = await asParallel([1, "2", 3]).joinByKey(asAsync([1, 2, "3"]),
            (x) => x,
            (x) => x,
            (x, y) => ( { x, y } ),
            EqualityComparer)
            .toArray()

        expect(joinBy.length).toBe(3)
        // expect(joinBy[0].x).toBe(1)
        // expect(joinBy[1].x).toBe(2)
        // expect(joinBy[2].x).toBe(3)
        expect(joinBy[0].x == joinBy[0].y)
        expect(joinBy[1].x == joinBy[1].y)
        expect(joinBy[2].x == joinBy[2].y)
    })
})
