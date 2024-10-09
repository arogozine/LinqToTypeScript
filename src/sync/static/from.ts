import type { IEnumerable, IterableType } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

type FromFunc = {
    /**
     * Creates an IEnumerable<TSource> from an array
     * @param source Array of Elements
     * @returns IEnumerable<TSource>
     */
    <TSource>(source: ArrayLike<TSource>): IEnumerable<TSource>
    /**
     * Creates an IEnumerable<TSource> from an IterableIterator<TSource> of elements
     * @param source Iteration of Elements
     * @returns IEnumerable<TSource>
     */
    <TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
    /**
     * Creates an IEnumerable<TSource> from an iterable type
     * @param source Iterable Type
     * @returns IEnumerable<TSource>
     */
    <TSource>(source: IterableType<TSource>): IEnumerable<TSource>
    /**
     * Creates an IEnumerable<TSource> from a generator function
     * @param source Generator
     * @returns IEnumerable<TSource>
     */
    <TSource>(source: () => Generator<TSource>): IEnumerable<TSource>
}

export const from: FromFunc = <TSource>(source: IterableType<TSource> | ArrayLike<TSource> | IterableIterator<TSource> | (() => Generator<TSource>)): IEnumerable<TSource> => {
    const isArrayLike = (x: any): x is ArrayLike<TSource> => {
        return Array.isArray(x) || (typeof x === "object" && typeof x.length === "number" && (x.length === 0 || 0 in x))
    }

    const isIterableType = (x: any): x is (() => Generator<TSource>) => typeof x === "function"

    if (isArrayLike(source)) {
        const generator = function* () {
            for (let i = 0; i < source.length; i++) {
                yield source[i]
            }
        }

        return new BasicEnumerable(generator)
    }

    if (isIterableType(source)) {
        return new BasicEnumerable(source)
    }

    return new BasicEnumerable(function* () {
        for (const val of source) {
            yield val
        }
    })
}
