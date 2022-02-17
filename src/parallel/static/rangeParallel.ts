import { ArgumentOutOfRangeException } from "../../shared"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IParallelEnumerable<number> that contains a range of sequential integral numbers.
 */
export const rangeParallel = (start: number, count: number): IParallelEnumerable<number> => {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
        throw new ArgumentOutOfRangeException("start")
    }

    const generator = () => {
        const items = []
        const maxI = start + count
        for (let i = start; i < maxI; i++) {
            items.push(Promise.resolve(i))
        }
        return items
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.ArrayOfPromises,
    })
}
