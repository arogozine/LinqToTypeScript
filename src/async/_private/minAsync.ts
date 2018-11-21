import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException} No Matching Elements
 */
export async function minAsync<TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    let min: number | null = null
    for await (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, await selector(item))
    }

    if (min === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return min
    }
}
