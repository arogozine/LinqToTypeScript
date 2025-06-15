import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

interface MaxByTestType {
    value: number
    getValue():  number
}

function asMaxByTestType(values: number[]) {
    return values.map(valueToMaxByTestType)
}

function valueToMaxByTestType(value: number) {
    return {
        value,
        getValue: () => value
    } as MaxByTestType
}

describe("maxBy", () => {
    //#region Empty

    itEnumerable<MaxByTestType>("MaxByEmptyError", (asEnumerable) => {
        expect(() => asEnumerable(asMaxByTestType([])).maxBy((x) => x.value))
            .toThrowError(InvalidOperationException)
    })

    itAsync("MaxByEmptyError", async () => {
        const value = await expectAsync(asAsync(asMaxByTestType([])).maxBy((x) => x.value))
        value.toThrowError(InvalidOperationException)
    })

    itParallel<MaxByTestType>("MaxByEmptyError", async (asParallel) => {
        const value = await expectAsync(asParallel(asMaxByTestType([])).maxBy((x) => x.value))
        value.toThrowError(InvalidOperationException)
    })

    //#endregion

    //#region Basic Cases

    itEnumerable<MaxByTestType>("Property", (asEnumerable) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(asEnumerable(items).maxBy((x) => x.value)).toBe(items[2])
    })

    itAsync("Property", async () => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asAsync(items).maxBy((x) => x.value)).toBe(items[2])
    })

    itParallel<MaxByTestType>("Property", async (asParallel) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asParallel((items)).maxBy((x) => x.value)).toBe(items[2])
    })

    itEnumerable<MaxByTestType>("Function", (asEnumerable) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(asEnumerable(items).maxBy((x) => x.getValue())).toBe(items[2])
    })

    itAsync("Function", async () => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asAsync(items).maxBy((x) => x.getValue())).toBe(items[2])
    })

    itParallel<MaxByTestType>("Function", async (asParallel) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asParallel((items)).maxBy((x) => x.getValue())).toBe(items[2])
    })

    //#endregion

    //#region Zero

    itEnumerable<MaxByTestType>("MaxBy Zero", (asEnumerable) => {
        const items = asMaxByTestType([0, -1])

        expect(asEnumerable(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MaxBy Zero", async () => {
        const items = asMaxByTestType([0, -1])

        expect(await asAsync(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MaxByTestType>("MaxBy Zero", async (asParallel) => {
        const items = asMaxByTestType([0, -1])

        expect(await asParallel((items)).maxBy((x) => x.value)).toBe(items[0])
    })

    //#endregion

    //#region Infinity

    itEnumerable<MaxByTestType>("MaxBy Infinity", (asEnumerable) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(asEnumerable(items).maxBy((x) => x.value)).toBe(items[1])
    })

    itAsync("MaxBy Infinity", async () => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).maxBy((x) => x.value)).toBe(items[1])
    })

    itParallel<MaxByTestType>("MaxBy Infinity", async (asParallel) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).maxBy((x) => x.value)).toBe(items[1])
    })

    itEnumerable<MaxByTestType>("MaxBy Negative Infinity", (asEnumerable) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(asEnumerable(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MaxBy Negative Infinity", async () => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(await asAsync(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MaxByTestType>("MaxBy Negative Infinity", async (asParallel) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(await asParallel((items)).maxBy((x) => x.value)).toBe(items[0])
    })

    //#endregion
    
    //#region Duplicate Array

    itEnumerable<MaxByTestType>("MaxBy Duplicate", (asEnumerable) => {
        const items = asMaxByTestType([0, 0])

        expect(asEnumerable(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itAsync("MaxBy Duplicate", async () => {
        const items = asMaxByTestType([0, 0])

        expect(await asAsync(items).maxBy((x) => x.value)).toBe(items[0])
    })

    itParallel<MaxByTestType>("MaxBy Duplicate", async (asParallel) => {
        const items = asMaxByTestType([0, 0])

        expect(await asParallel((items)).maxBy((x) => x.value)).toBe(items[0])
    })

    //#endregion
})
