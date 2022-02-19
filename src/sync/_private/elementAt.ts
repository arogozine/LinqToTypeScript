import { ArgumentOutOfRangeException } from "../../shared"

export const elementAt = <TSource>(source: Iterable<TSource>, index: number): TSource => {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}
