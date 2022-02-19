import { ErrorString, InvalidOperationException } from "../../shared"

type AverageFunc = {
    (source: AsyncIterable<number>): Promise<number>
    <TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
}

export const average: AverageFunc = async <TSource>(
    source: AsyncIterable<TSource> | AsyncIterable<number>,
    selector?: (x: TSource) => number): Promise<number> => {

    let value = 0
    let count = 0

    if (selector) {
        for await (const item of source) {
            value = value + selector(item as TSource)
            count = count + 1
        }
    } else {
        for await (const item of source) {
            value = value + (item as number)
            count = count + 1
        }
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}