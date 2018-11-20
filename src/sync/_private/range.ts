import { ArgumentOutOfRangeException } from "../../shared/TypesAndHelpers"
import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export function range(start: number, count: number): IEnumerable<number> {
    if (start < 0) {
        throw new ArgumentOutOfRangeException(`start`)
    }

    function* iterator() {
        const max = start + count
        for (let i = start; i < max; i++) {
            yield i
        }
    }

    return new BasicEnumerable(iterator)
}
