import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function union<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
        if (comparer) {
            return union_2(first, second, comparer)
        } else {
            return union_1(first, second)
        }
}

function union_1<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>) {

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

function union_2<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: IEqualityComparer<TSource>) {

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
