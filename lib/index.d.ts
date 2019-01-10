import { IAsyncEnumerable, IEnumerable, IParallelEnumerable } from "./types";
export * from "./shared/shared";
export * from "./sync/sync";
/**
 * Determine if the source is IParallelEnumerable
 * @param source Any value
 */
export declare function isParallelEnumerable(source: any): source is IParallelEnumerable<any>;
/**
 * Determine if a type is IAsyncEnumerable
 * @param source Any Value
 */
export declare function isAsyncEnumerable(source: any): source is IAsyncEnumerable<any>;
/**
 * Determine if a source is a IEnumerable
 * @param source Any Value
 */
export declare function isEnumerable(source: any): source is IEnumerable<any>;
/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export declare function initializeLinq(): void;
