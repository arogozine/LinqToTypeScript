import { IPrototype } from "../types";
/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export declare function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<Y>): void;
