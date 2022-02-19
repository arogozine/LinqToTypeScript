import { ErrorString, InvalidOperationException } from "../../shared"

export const averageAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    let value = 0
    let count = 0
    for await (const item of source) {
        value = value + await selector(item)
        count = count + 1
    }

    if (count === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / count
}
