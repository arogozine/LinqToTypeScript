import { IConstructor } from "./shared/shared";
export * from "./shared/shared";
export * from "./sync/sync";
export * from "./async/async";
export * from "./parallel/parallel";
export interface IPrototype<T, Y extends Iterable<T>> extends IConstructor<{
    [key: string]: any;
}> {
    new (_?: any): Y;
}
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
