import { ArgumentOutOfRangeException } from "../../shared/ArgumentOutOfRangeException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IParallelEnumerable<T> that contains a repeated value.
 */
export function repeat<TResult>(
    // tslint:disable-next-line:no-shadowed-variable
    element: TResult, count: number, delay?: number): IParallelEnumerable<TResult> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }
    if (delay) {
        return repeat2(element, count, delay)
    } else {
        return repeat1(element, count)
    }
}

const repeat1 = <T>(element: T, count: number): IParallelEnumerable<T> => {
    const generator = async () => {
        const values = new Array<T>(count)
        for (let i = 0; i < count; i++) {
            values[i] = element
        }
        return values
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

const repeat2 = <T>(element: T, count: number, delay: number): IParallelEnumerable<T> => {
    const generator = async () => {
        const values = new Array<Promise<T>>(count)
        for (let i = 0; i < count; i++) {
            values[i] = new Promise<T>((resolve) => setTimeout(() => resolve(element), delay))
        }
        return values
    }

    return new BasicParallelEnumerable<T>({
        generator,
        type: ParallelGeneratorType.PromiseOfPromises,
    })
}
