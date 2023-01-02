import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

const objectKeys = <TObject extends object>(object: TObject) => {
    return Object.keys(object) as Array<keyof TObject>
}

describe("toObjectAsync", () => {
    itEnumerableAsync("basic", async (asEnumerable) => {
        const object = await asEnumerable([1, 2, 3])
            .toObjectAsync(async (x) => `Key_${ x }`)
        
        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itAsync("basic", async () => {
        const object = await asAsync([1, 2, 3])
            .toObjectAsync(async (x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itParallel("basic", async (asParallel) => {
        const object = await asParallel([1, 2, 3])
            .toObjectAsync(async (x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })
})
