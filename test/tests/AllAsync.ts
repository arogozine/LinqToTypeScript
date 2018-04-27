import { asAsync, asPromise, expectAsync, itAsync, itEnumerableAsync, itParallel } from "./../TestHelpers"

describe("AllAsync", () => {
    itEnumerableAsync<{ Age: number, Name: string}>("All", async (asEnumerable) => {
        // Create an array of Pets.
        const pets = asEnumerable([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = pets.allAsync((pet) => asPromise(pet.Name.startsWith("B")))

        expect(await allStartWithB).toBe(false)
    })

    itAsync("AllAsync", async () => {
        // Create an array of Pets.
        const pets = asAsync([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.allAsync((pet) => asPromise(pet.Name.startsWith("B")))

        expect(allStartWithB).toBe(false)
    })

    itParallel<{ Age: number, Name: string }>("AllParallel", async (asParallel) => {
        // Create an array of Pets.
        const pets = asParallel([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names
        // in the array start with 'B'.
        const allStartWithB = await pets.allAsync((pet) => asPromise(pet.Name.startsWith("B")))

        expect(allStartWithB).toBe(false)
    })

    itEnumerableAsync("ManyElements", async (asEnumerable) => {
        const allTrue = expect(await asEnumerable([1, 2, 3]).allAsync((x) => asPromise(x !== 0)))
        allTrue.toBe(true)

        const allFalse = expect(await asEnumerable([0, 1, 2]).allAsync((x) => asPromise(x > 5)))
        allFalse.toBe(false)
    })

    itAsync("ManyElementsAsync", async () => {
        expect(await asAsync([1, 2, 3]).allAsync((x) => asPromise(x !== 0))).toBe(true)
        expect(await asAsync([0, 1, 2]).allAsync((x) => asPromise(x > 5))).toBe(false)
    })

    itAsync("ManyElementsParallel", async () => {
        expect(await asAsync([1, 2, 3]).allAsync((x) => asPromise(x !== 0))).toBe(true)
        expect(await asAsync([0, 1, 2]).allAsync((x) => asPromise(x > 5))).toBe(false)
    })

    itEnumerableAsync("EmptyElementTrue", async (asEnumerable) => {
        expect(await asEnumerable([]).allAsync((x) => asPromise(x === 1))).toBe(true)
    })

    itAsync("EmptyElementTrueAsync", async () => {
        const expect = await expectAsync(asAsync([]).allAsync((x) => asPromise(x === 1)))
        expect.toBe(true)
    })

    itParallel("EmptyElementTrueParallel", async (asParallel) => {
        const expect = await expectAsync(asParallel([]).allAsync((x) => asPromise(x === 1)))
        expect.toBe(true)
    })
})
