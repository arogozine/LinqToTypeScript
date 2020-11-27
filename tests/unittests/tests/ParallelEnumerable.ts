import { itParallel } from "../TestHelpers"

describe("ParallelEnumerable", () => {
    itParallel("AsyncForEach Manual", async (asParallel) => {
        const parallelValues = asParallel([1, 2, 3])
        const asyncIterator = parallelValues[Symbol.asyncIterator]
        expect(asyncIterator).toBeDefined()

        const iterator = parallelValues[Symbol.asyncIterator]()
        expect(iterator).toBeDefined()

        const promise = iterator.next()
        expect(promise).toBeDefined()

        const result = await promise
        expect(result.done).toBe(false)
        expect(result.value).toBe(1)

        const promise2 = iterator.next()
        expect(promise2).toBeDefined()
        const result2 = await promise2
        expect(result2.done).toBe(false)
        expect(result2.value).toBe(2)

        const promise3 = iterator.next()
        expect(promise3).toBeDefined()
        const result3 = await promise3
        // what ?
        expect(result3.done).toBe(false)
        expect(result3.value).toBe(3)

        /*
        const promise4 = iterator.next()
        expect(promise4).toBeDefined()
        const result4 = await promise4
        console.log(JSON.stringify(result))
        expect(result.done).toBe(true)
        expect(result.value).toBeNull()
        */
    })

    itParallel("AsyncForEach - Automatic", async (asParallel) => {
        for await (const value of asParallel([1, 2, 3])) {
            expect(value).toBeDefined()
        }
    })
})
