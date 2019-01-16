import { IPrototype } from "../types";
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export declare function bindLinqParallel<T, Y extends AsyncIterable<T>>(object: IPrototype<Y>): void;
