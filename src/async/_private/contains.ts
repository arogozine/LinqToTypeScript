import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { StrictEqualityComparer } from "../../shared/TypesAndHelpers"

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
