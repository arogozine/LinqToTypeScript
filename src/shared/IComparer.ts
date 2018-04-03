/**
 * Compares two numbers for sorting
 */
export type IComparer<TKey> = (x: TKey, y: TKey) => number
