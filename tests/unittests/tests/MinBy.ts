import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

interface MinByTestType {
    value: number
    getValue():  number
}

function asMinByTestType(values: number[]) {
    return values.map(valueToMinByTestType)
}

function valueToMinByTestType(value: number) {
    return {
        value,
        getValue: () => value
    } as MinByTestType
}

describe("minBy", () => {
    //#region Empty

    itEnumerable<MinByTestType>("MinByEmptyError", (asEnumerable) => {
        expect(() => asEnumerable(asMinByTestType([])).minBy((x) => x.value))
            .toThrow(InvalidOperationException)
    })

    itAsync("MinByEmptyError", async () => {
        const value = await expectAsync(asAsync(asMinByTestType([])).minBy((x) => x.value))
        value.toThrow(InvalidOperationException)
    })

    itParallel<MinByTestType>("MinByEmptyError", async (asParallel) => {
        const value = await expectAsync(asParallel(asMinByTestType([])).minBy((x) => x.value))
        value.toThrow(InvalidOperationException)
    })

    //#endregion

    //#region Basic Cases

    itEnumerable<MinByTestType>("Property", (asEnumerable) => {
        const items = asMinByTestType([1, 2, 3])

        expect(asEnumerable(items).minBy((x) => x.value)).toBe(items[0])
    })

    itAsync("Property", async () => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asAsync(items).minBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MinByTestType>("Property", async (asParallel) => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asParallel((items)).minBy((x) => x.value)).toBe(items[0])
    })

    itEnumerable<MinByTestType>("Function", (asEnumerable) => {
        const items = asMinByTestType([1, 2, 3])

        expect(asEnumerable(items).minBy((x) => x.getValue())).toBe(items[0])
    })

    itAsync("Function", async () => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asAsync(items).minBy((x) => x.getValue())).toBe(items[0])
    })

    itParallel<MinByTestType>("Function", async (asParallel) => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asParallel((items)).minBy((x) => x.getValue())).toBe(items[0])
    })

    //#endregion

    //#region Zero

    itEnumerable<MinByTestType>("MinBy Zero", (asEnumerable) => {
        const items = asMinByTestType([0, 1])

        expect(asEnumerable(items).minBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MinBy Zero", async () => {
        const items = asMinByTestType([0, 1])

        expect(await asAsync(items).minBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MinByTestType>("MinBy Zero", async (asParallel) => {
        const items = asMinByTestType([0, 1])

        expect(await asParallel((items)).minBy((x) => x.value)).toBe(items[0])
    })

    //#endregion

    //#region Infinity

    itEnumerable<MinByTestType>("MinBy Infinity", (asEnumerable) => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(asEnumerable(items).minBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MinBy Infinity", async () => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).minBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MinByTestType>("MinBy Infinity", async (asParallel) => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).minBy((x) => x.value)).toBe(items[0])
    })

    itEnumerable<MinByTestType>("MinBy Positive Infinity", (asEnumerable) => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(asEnumerable(items).minBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MinBy Positive Infinity", async () => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).minBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MinByTestType>("MinBy Positive Infinity", async (asParallel) => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).minBy((x) => x.value)).toBe(items[0])
    })

    //#endregion
    
    //#region Duplicate Array

    itEnumerable<MinByTestType>("MinBy Duplicate", (asEnumerable) => {
        const items = asMinByTestType([0, 0])

        expect(asEnumerable(items).minBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MinBy Duplicate", async () => {
        const items = asMinByTestType([0, 0])

        expect(await asAsync(items).minBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MinByTestType>("MinBy Duplicate", async (asParallel) => {
        const items = asMinByTestType([0, 0])

        expect(await asParallel((items)).minBy((x) => x.value)).toBe(items[0])
    })

    //#endregion
})
