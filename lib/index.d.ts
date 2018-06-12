import { IAsyncEnumerable } from ".";
import { IParallelEnumerable } from "./parallel/parallel";
import { IConstructor } from "./shared/shared";
import { IEnumerable } from "./sync/sync";
export * from "./shared/shared";
export { IEnumerable, Enumerable, IOrderedEnumerable, ArrayEnumerable, } from "./sync/sync";
export * from "./async/async";
export * from "./parallel/parallel";
export interface IPrototype<T, Y extends Iterable<T>> extends IConstructor<{
    [key: string]: any;
}> {
    new (_?: any): Y;
}
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
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void;
/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export declare function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<T, Y>): void;
/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export declare function initializeLinq(): void;
