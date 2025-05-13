import { InvalidOperationException } from "linq-to-typescript"
import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

interface MinByAsyncTestType {
    asyncValue():  Promise<number>
}

function asMinByTestType(values: number[]) {
    return values.map(valueToMinByTestType)
}

function valueToMinByTestType(value: number) {
    return {
        asyncValue: async () => Promise.resolve(value)
    } as MinByAsyncTestType
}

describe("minByAsync", () => {
    //#region Empty

    itEnumerable<MinByAsyncTestType>("MinByAsyncEmptyError", async (asEnumerable) => {
        const value = await expectAsync(asEnumerable(asMinByTestType([])).minByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    itAsync("MinByAsyncEmptyError", async () => {
        const value = await expectAsync(asAsync(asMinByTestType([])).minByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    itParallel<MinByAsyncTestType>("MinByAsyncEmptyError", async (asParallel) => {
        const value = await expectAsync(asParallel(asMinByTestType([])).minByAsync(async (x) => await x.asyncValue()))
        value.toThrowError(InvalidOperationException)
    })

    //#endregion

    //#region Basic Cases

    itEnumerable<MinByAsyncTestType>("MinByAsync Function", async (asEnumerable) => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asEnumerable(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MinByAsync Function", async () => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asAsync(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MinByAsyncTestType>("MinByAsync Function", async (asParallel) => {
        const items = asMinByTestType([1, 2, 3])

        expect(await asParallel((items)).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion

    //#region Zero

    itEnumerable<MinByAsyncTestType>("MinByAsync Zero", async (asEnumerable) => {
        const items = asMinByTestType([0, 1])

        expect(await asEnumerable(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MinByAsync Zero", async () => {
        const items = asMinByTestType([0, 1])

        expect(await asAsync(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MinByAsyncTestType>("MinByAsync Zero", async (asParallel) => {
        const items = asMinByTestType([0, 1])

        expect(await asParallel((items)).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion

    //#region Infinity

    itEnumerable<MinByAsyncTestType>("MinByAsync Infinity", async (asEnumerable) => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asEnumerable(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MinByAsync Infinity", async () => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MinByAsyncTestType>("MinByAsync Infinity", async (asParallel) => {
        const items = asMinByTestType([ Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itEnumerable<MinByAsyncTestType>("MinByAsync Positive Infinity", async (asEnumerable) => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(await asEnumerable(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MinByAsync Positive Infinity", async () => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(await asAsync(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MinByAsyncTestType>("MinByAsync Positive Infinity", async (asParallel) => {
        const items = asMinByTestType([ Number.POSITIVE_INFINITY ])

        expect(await asParallel((items)).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion
    
    //#region Duplicate Array

    itEnumerable<MinByAsyncTestType>("MinByAsync Duplicate", async (asEnumerable) => {
        const items = asMinByTestType([0, 0])

        expect(await asEnumerable(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itAsync("MinByAsync Duplicate", async () => {
        const items = asMinByTestType([0, 0])

        expect(await asAsync(items).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    itParallel<MinByAsyncTestType>("MinByAsync Duplicate", async (asParallel) => {
        const items = asMinByTestType([0, 0])

        expect(await asParallel((items)).minByAsync(async (x) => await x.asyncValue())).toBe(items[0])
    })

    //#endregion
})
