import { ArgumentOutOfRangeException } from "../../shared/ArgumentOutOfRangeException"
import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IAsyncEnumerable<number> that contains a range of sequential integral numbers.
 */
export function range(start: number, count: number): IAsyncEnumerable<number> {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    async function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
