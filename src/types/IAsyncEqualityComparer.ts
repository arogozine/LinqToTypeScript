/**
 * Compares two values asynchronously
 */
export type IAsyncEqualityComparer<T> = (x: T, y: T) => Promise<boolean>
