import { ErrorString, InvalidOperationException } from "../../shared"

export const maxAsync = async <TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    let max: number | null = null
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, await selector(item))
    }

    if (max === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return max
    }
}
