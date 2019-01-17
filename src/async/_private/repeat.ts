import { ArgumentOutOfRangeException } from "../../shared/ArgumentOutOfRangeException"
import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
export function repeat<TResult>(
    element: TResult, count: number, delay?: number): IAsyncEnumerable<TResult> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return repeat_2(element, count, delay)
    } else {
        return repeat_1(element, count)
    }
}

function repeat_1<T>(element: T, count: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicAsyncEnumerable(iterator)
}

function repeat_2<T>(element: T, count: number, delay: number): IAsyncEnumerable<T> {
    async function* iterator() {
        for (let i = 0; i < count; i++) {
            yield await new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
