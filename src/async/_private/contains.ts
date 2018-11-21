import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"
import { IEqualityComparer } from "../../types"

export async function contains<TSource>(
    source: AsyncIterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): Promise<boolean> {

    for await (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}
