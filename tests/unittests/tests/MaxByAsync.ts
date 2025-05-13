import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

interface MaxByAsyncTestType {
    asyncValue():  Promise<number>
}

function asMaxByTestType(values: number[]) {
    return values.map(valueToMaxByTestType)
}

function valueToMaxByTestType(value: number) {
    return {
        asyncValue: async () => Promise.resolve(value)
    } as MaxByAsyncTestType
}

describe("maxByAsync", () => {
    //#region Empty

    itEnumerable<MaxByAsyncTestType>("MaxByAsyncEmptyError", async (asEnumerable) => {
        const value = await expectAsync(asEnumerable(asMaxByTestType([])).maxByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    itAsync("MaxByAsyncEmptyError", async () => {
        const value = await expectAsync(asAsync(asMaxByTestType([])).maxByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    itParallel<MaxByAsyncTestType>("MaxByAsyncEmptyError", async (asParallel) => {
        const value = await expectAsync(asParallel(asMaxByTestType([])).maxByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    //#endregion

    //#region Basic Cases

    itEnumerable<MaxByAsyncTestType>("MaxByAsync Function", async (asEnumerable) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asEnumerable(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[2])
    })

    itAsync("MaxByAsync Function", async () => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asAsync(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[2])
    })

    itParallel<MaxByAsyncTestType>("MaxByAsync Function", async (asParallel) => {
        const items = asMaxByTestType([1, 2, 3])

        expect(await asParallel((items)).maxByAsync(async (x) => await x.asyncValue())).toBe(items[2])
    })

    //#endregion

    //#region Zero

    itEnumerable<MaxByAsyncTestType>("MaxByAsync Zero", async (asEnumerable) => {
        const items = asMaxByTestType([0, -1])

        expect(await asEnumerable(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MaxByAsync Zero", async () => {
        const items = asMaxByTestType([0, -1])

        expect(await asAsync(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MaxByAsyncTestType>("MaxByAsync Zero", async (asParallel) => {
        const items = asMaxByTestType([0, -1])

        expect(await asParallel((items)).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion

    //#region Infinity

    itEnumerable<MaxByAsyncTestType>("MaxByAsync Infinity", async (asEnumerable) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asEnumerable(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[1])
    })

    itAsync("MaxByAsync Infinity", async () => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[1])
    })

    itParallel<MaxByAsyncTestType>("MaxByAsync Infinity", async (asParallel) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).maxByAsync(async (x) => await x.asyncValue())).toBe(items[1])
    })

    itEnumerable<MaxByAsyncTestType>("MaxByAsync Negative Infinity", async (asEnumerable) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(await asEnumerable(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MaxByAsync Negative Infinity", async () => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(await asAsync(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MaxByAsyncTestType>("MaxByAsync Negative Infinity", async (asParallel) => {
        const items = asMaxByTestType([ Number.NEGATIVE_INFINITY ])

        expect(await asParallel((items)).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion
    
    //#region Duplicate Array

    itEnumerable<MaxByAsyncTestType>("MaxByAsync Duplicate", async (asEnumerable) => {
        const items = asMaxByTestType([0, 0])

        expect(await asEnumerable(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MaxByAsync Duplicate", async () => {
        const items = asMaxByTestType([0, 0])

        expect(await asAsync(items).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MaxByAsyncTestType>("MaxByAsync Duplicate", async (asParallel) => {
        const items = asMaxByTestType([0, 0])

        expect(await asParallel((items)).maxByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion
})
