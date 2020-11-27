import { ArgumentOutOfRangeException } from "../../shared"
import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @param delay How long to delay the repeat (ms)
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
export function repeatAsync<TResult>(
    element: TResult, count: number, delay?: number): IAsyncEnumerable<TResult> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return repeat2(element, count, delay)
    } else {
        return repeat1(element, count)
    }
}

/**
 * @private
 */
const repeat1 = <T>(element: T, count: number): IAsyncEnumerable<T> => {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

/**
 * @private
 */
const repeat2 = <T>(element: T, count: number, delay: number): IAsyncEnumerable<T> => {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
