import { StrictEqualityComparer } from "../../shared/shared"
import { IEqualityComparer } from "../../types/IEqualityComparer"

export function contains<TSource>(
    source: Iterable<TSource>,
    value: TSource,
    comparer: IEqualityComparer<TSource> = StrictEqualityComparer): boolean {

    for (const item of source) {
        if (comparer(value, item)) {
            return true
        }
    }

    return false
}
