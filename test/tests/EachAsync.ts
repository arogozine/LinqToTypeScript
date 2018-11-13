import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"
import {
    from as fromParallel,
    ParallelGeneratorType,
} from "./../../src/parallel/parallel"

describe("eachAsync", () => {
    itEnumerableAsync("Basic", async (asEnumerable) => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asEnumerable(values).eachAsync((x) => {
            return new Promise((resolve) => {
                expect(values.find((y) => y === x)).toBeTruthy()
                count++
                resolve()
            })
        }).toArray()

        expect(count).toBe(values.length)
    })

    itAsync("Basic", async () => {
        const values = [1, 2, 3, 4, 5]

        let count = 0
        await asAsync(values).eachAsync((x) => {
            return new Promise((resolve) => {
                expect(values.find((y) => y === x)).toBeTruthy()
                count++
                resolve()
            })
        }).toArray()

        expect(count).toBe(values.length)
    })

    itParallel("Basic", async (asParallel) => {
        let canStart = false
        let first = true
        const eachAsync = (x: number) => {
            expect(canStart).toBe(true)
            const time = x === 1 ? 100 : 250
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    expect(first).toBe(time === 100)
                    first = false
                    resolve()
                }, time)
            })
        }
        const generator: () => Array<Promise<number>> = () => [
            (async () => 1)(),
            (async () => 2)(),
        ]

        const lazyParallel =
            fromParallel<number>(ParallelGeneratorType.ArrayOfPromises, generator)
            .eachAsync(eachAsync)
        canStart = true
        const result = await lazyParallel.toArray()
        expect(result).toEqual([1, 2])
    })
})
