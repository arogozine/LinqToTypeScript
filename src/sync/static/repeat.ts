import { ArgumentOutOfRangeException } from "../../shared"
import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IEnumerable<T> that contains a repeated value.
 */
export const repeat = <TResult>(element: TResult, count: number): IEnumerable<TResult> => {
    if (count < 0) {
        throw new ArgumentOutOfRangeException("count")
    }

    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicEnumerable(iterator)
}
