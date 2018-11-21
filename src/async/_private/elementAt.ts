import { ArgumentOutOfRangeException } from "../../shared/TypesAndHelpers"

/**
 * @throws {ArgumentOutOfRangeException}
 */
export async function elementAt<TSource>(source: AsyncIterable<TSource>, index: number): Promise<TSource> {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for await (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}
