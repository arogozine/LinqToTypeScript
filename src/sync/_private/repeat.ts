import { ArgumentOutOfRangeException } from "../../shared/TypesAndHelpers"
import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function repeat<T>(element: T, count: number): IEnumerable<T> {
    if (count < 0) {
        throw new ArgumentOutOfRangeException(`count`)
    }

    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element
        }
    }

    return new BasicEnumerable(iterator)
}
