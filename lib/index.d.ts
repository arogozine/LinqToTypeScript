import { IConstructor } from "./shared/shared";
export { StrictEqualityComparer, ErrorString, EqualityComparer, StringifyComparer, NumberComparer, AsTuple, InvalidOperationException, ArgumentOutOfRangeException } from "./shared/shared";
export { IComparer, IConstructor, IGrouping, IEqualityComparer, RecOrdMap, ITuple } from "./shared/shared";
export { ArrayEnumerable, Enumerable, IEnumerable, IOrderedEnumerable } from "./sync/sync";
export { AsyncEnumerable, IAsyncEnumerable } from "./async/async";
export { IParallelEnumerable, ParallelEnumerable } from "./parallel/parallel";
export interface IPrototype<T, Y extends Iterable<T>> extends IConstructor<{
    [key: string]: any;
}> {
    new (_?: any): Y;
}
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void;
export declare function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(object: IPrototype<T, Y>): void;
export declare function initializeLinq(): void;
