/**
 * Recursive Ordered Map
 */
export type RecOrdMap<T> = Map<number | string, T[] | Map<number | string, any>>
