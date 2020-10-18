import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("ofType", () => {
    // tslint:disable-next-line:no-construct
    const array = ["str", "str2", 1, 2, 3, {}, true, new Number(1)]

    itEnumerable<any>("string", (asEnumerable) => {
        expect(asEnumerable(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itAsync("string", async () => {
        expect(await asAsync(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itParallel<{}>("string", async (asParallel) => {
        expect(await asParallel(array).ofType("string").toArray()).toEqual(["str", "str2"])
    })

    itEnumerable<any>("number", (asEnumerable) => {
        expect(asEnumerable(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    itAsync("number", async () => {
        expect(await asAsync(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    itParallel<{}>("number", async (asParallel) => {
        expect(await asParallel(array).ofType("number").toArray()).toEqual([1, 2, 3])
    })

    itEnumerable<any>("object", (asEnumerable) => {
        // tslint:disable-next-line:no-construct
        expect(asEnumerable(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itAsync("object", async () => {
        // tslint:disable-next-line:no-construct
        expect(await asAsync(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itParallel<{}>("object", async (asParallel) => {
        // tslint:disable-next-line:no-construct
        expect(await asParallel(array).ofType("object").toArray()).toEqual([{}, new Number(1)])
    })

    itEnumerable<any>("boolean", (asEnumerable) => {
        expect(asEnumerable(array).ofType("boolean").toArray()).toEqual([true])
    })

    itAsync("boolean", async () => {
        expect(await asAsync(array).ofType("boolean").toArray()).toEqual([true])
    })

    itParallel<{}>("boolean", async (asParallel) => {
        expect(await asParallel(array).ofType("boolean").toArray()).toEqual([true])
    })

    itEnumerable<any>("Number (Object)", (asEnumerable) => {
        expect(asEnumerable(array).ofType(Number).toArray()).toEqual([new Number(1)])
    })

    itAsync("Number (Object)", async () => {
        expect(await asAsync(array).ofType(Number).toArray()).toEqual([new Number(1)])
    })

    itParallel<{}>("Number (Object)", async (asParallel) => {
        expect(await asParallel(array).ofType(Number).toArray()).toEqual([new Number(1)])
    })
})
