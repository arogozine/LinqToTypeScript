import { IPrototype } from "../types";
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<Y>): void;
