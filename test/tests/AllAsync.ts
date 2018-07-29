import { asAsync, expectAsync, itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("allAsync", () => {
    itEnumerableAsync<{ Age: number, Name: string}>("Basic", async (asEnumerable) => {
        // Create an array of Pets.
        const pets = asEnumerable([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = pets.allAsync(async (pet) => pet.Name.startsWith("B"))

        expect(await allStartWithB).toBe(false)
    })

    itAsync("Basic", async () => {
        // Create an array of Pets.
        const pets = asAsync([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.allAsync(async (pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itParallel<{ Age: number, Name: string }>("Basic", async (asParallel) => {
        // Create an array of Pets.
        const pets = asParallel([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.allAsync(async (pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itEnumerableAsync("ManyElements", async (asEnumerable) => {
        const allTrue = expect(await asEnumerable([1, 2, 3]).allAsync(async (x) => x !== 0))
        allTrue.toBe(true)

        const allFalse = expect(await asEnumerable([0, 1, 2]).allAsync(async (x) => x > 5))
        allFalse.toBe(false)
    })

    itAsync("ManyElements", async () => {
        expect(await asAsync([1, 2, 3]).allAsync(async (x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).allAsync(async (x) => x > 5)).toBe(false)
    })

    itParallel("ManyElements", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).allAsync(async (x) => x !== 0)).toBe(true)
        expect(await asParallel([0, 1, 2]).allAsync(async (x) => x > 5)).toBe(false)
    })

    itEnumerableAsync("EmptyElementTrue", async (asEnumerable) => {
        expect(await asEnumerable([]).allAsync(async (x) => x === 1)).toBe(true)
    })

    itAsync("EmptyElementTrue", async () => {
        const expect = await expectAsync(asAsync([]).allAsync(async (x) => x === 1))
        expect.toBe(true)
    })

    itParallel("EmptyElementTrue", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).allAsync(async (x) => x === 1))
        expect.toBe(true)
    })
})
