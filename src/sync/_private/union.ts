import type { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const union = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> => {
        if (comparer) {
            return union2(first, second, comparer)
        } else {
            return union1(first, second)
        }
}

const union1 = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>) => {

    function* iterator() {

        const set = new Set<TSource>()

        for (const item of first) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }

        for (const item of second) {
            if (set.has(item) === false) {
                yield item
                set.add(item)
            }
        }
    }

    return new BasicEnumerable<TSource>(iterator)
}

const union2 = <TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource>) => {

    function *iterator(): IterableIterator<TSource> {
        const result: TSource[] = []

        for (const source of [first, second]) {
            for (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    yield value
                    result.push(value)
                }
            }
        }
    }

    return new BasicEnumerable(iterator)
}
