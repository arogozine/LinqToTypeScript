import { ArgumentOutOfRangeException } from "../../shared"
import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IEnumerable<number> that contains a range of sequential integral numbers.
 */
export const range = (start: number, count: number): IEnumerable<number> => {
    if (start < 0 || (start + count - 1) > Number.MAX_SAFE_INTEGER) {
        throw new ArgumentOutOfRangeException("start")
    }

    function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicEnumerable(iterator)
}
