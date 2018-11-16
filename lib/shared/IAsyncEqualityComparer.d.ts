/**
 * Compares two values asynchronously
 */
export declare type IAsyncEqualityComparer<T> = (x: T, y: T) => Promise<boolean>;
