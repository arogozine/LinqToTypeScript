import { ParallelEnumerable, ParallelGeneratorType } from "index"
import { itAsync } from "../../TestHelpers"

describe("eachAsync Parallel Execution", () => {
    itAsync("eachAsync", async () => {
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

        const lazyParallel = ParallelEnumerable.from<number>(ParallelGeneratorType.ArrayOfPromises, generator)
            .eachAsync(eachAsync)
        canStart = true
        const result = await lazyParallel.toArray()
        expect(result).toEqual([1, 2])
    })
})
