import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { StrictEqualityComparer } from "../../shared/shared"

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
