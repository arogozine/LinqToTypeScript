import { asAsync, asParallel, expectAsync, itAsync, itEnumerable } from "./../TestHelpers"

describe("all", () => {
    itEnumerable<{ Age: number, Name: string}>("All", (asEnumerable) => {
        // Create an array of Pets.
        const pets = asEnumerable([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itAsync("AllAsync", async () => {
        // Create an array of Pets.
        const pets = asAsync([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itAsync("AllParallel", async () => {
        // Create an array of Pets.
        const pets = asParallel([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.all((pet) => pet.Name.startsWith("B"))

        expect(allStartWithB).toBe(false)
    })

    itEnumerable("ManyElements", (asEnumerable) => {
        expect(asEnumerable([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(asEnumerable([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itAsync("ManyElementsAsync", async () => {
        expect(await asAsync([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itAsync("ManyElementsParallel", async () => {
        expect(await asAsync([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itEnumerable("EmptyElementTrue", (asEnumerable) => {
        expect(asEnumerable([]).all((x) => x === 1)).toBe(true)
    })

    itAsync("EmptyElementTrueAsync", async () => {
        const expect = await expectAsync(asAsync([]).all((x) => x === 1))
        expect.toBe(true)
    })

    itAsync("EmptyElementTrueParallel", async () => {
        const expect = await expectAsync(asParallel([]).all((x) => x === 1))
        expect.toBe(true)
    })
})
