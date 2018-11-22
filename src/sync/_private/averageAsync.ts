import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements
 */
export async function averageAsync<TSource>(
    source: Iterable<TSource>, func: (x: TSource) => Promise<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for (const item of source) {
        value = (value || 0) + await func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
