import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

const objectKeys = <TObject>(object: TObject) => {
    return Object.keys(object) as Array<keyof TObject>
}

describe("toObject", () => {
    itEnumerable("basic", (asEnumerable) => {
        const object = asEnumerable([1, 2, 3])
            .toObject((x) => `Key_${ x }`)
        
        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itAsync("basic", async () => {
        const object = await asAsync([1, 2, 3])
            .toObject((x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })

    itParallel("basic", async (asParallel) => {
        const object = await asParallel([1, 2, 3])
            .toObject((x) => `Key_${ x }`)

        for (const key of objectKeys(object)) {
            const value = object[key]
            expect(key).toBe(`Key_${ value }`)
        }
    })
})
