import { IPrototype } from "../types";
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export declare function bindLinqAsync<T, Y extends AsyncIterable<T>>(object: IPrototype<Y>): void;
