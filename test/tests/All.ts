import { asAsync, expectAsync, itAsync, itEnumerable, itParallel } from "./../TestHelpers"

describe("all", () => {
    it("String", () => {
        expect("aaaa".all(x => x === "a")).toBe(true)
        expect("aaab".all(x => x === "a")).toBe(false)
    })

    it("EmptyString", () => {
        expect("".all(x => x === "a")).toBe(true)
    })

    itEnumerable<{ Age: number, Name: string}>("Basic", (asEnumerable) => {
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

    itAsync("Basic", async () => {
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

    itParallel<{ Age: number, Name: string }>("Basic", async (asParallel) => {
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

    itAsync("ManyElements", async () => {
        expect(await asAsync([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asAsync([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itParallel("ManyElements", async (asParallel) => {
        expect(await asParallel([1, 2, 3]).all((x) => x !== 0)).toBe(true)
        expect(await asParallel([0, 1, 2]).all((x) => x > 5)).toBe(false)
    })

    itEnumerable("EmptyElementTrue", (asEnumerable) => {
        expect(asEnumerable([]).all((x) => x === 1)).toBe(true)
    })

    itAsync("EmptyElementTrue", async () => {
        const expect = await expectAsync(asAsync([]).all((x) => x === 1))
        expect.toBe(true)
    })

    itParallel("EmptyElementTrue", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).all((x) => x === 1))
        expect.toBe(true)
    })
})
