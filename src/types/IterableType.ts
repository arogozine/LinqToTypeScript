export type IterableType<TSource> = {
    [Symbol.iterator](): IterableIterator<TSource>
}