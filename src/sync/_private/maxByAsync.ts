import { ErrorString, InvalidOperationException } from "../../shared"

export const maxByAsync = async <TSource>(
    source: Iterable<TSource>, 
    selector: (x: TSource) => Promise<number>): Promise<TSource> => {
    let maxValue: number | null = null
    let maxItem: TSource | null = null
    for (const item of source) {
        const itemValue = await selector(item)
        if (maxValue === null || itemValue > maxValue) {
            maxValue = itemValue
            maxItem = item
        }
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
