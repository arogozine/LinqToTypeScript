import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

export async function averageAsync<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource) => Promise<number>): Promise<number> {
    let value: number | undefined
    let count: number | undefined
    for await (const item of source) {
        value = (value || 0) + await func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
