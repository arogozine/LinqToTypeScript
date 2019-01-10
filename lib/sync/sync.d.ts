import { IPrototype } from "../types";
import { ArrayEnumerable } from "./ArrayEnumerable";
export { IEnumerable, IOrderedEnumerable } from "../types";
export * from "./Enumerable";
export { ArrayEnumerable };
export { Grouping } from "./Grouping";
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
