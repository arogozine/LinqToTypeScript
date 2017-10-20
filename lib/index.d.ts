import { IPrototype } from "./Interfaces";
export { StrictEqualityComparer, EqualityComparer, StringifyComparer, NumberComparer, AsTuple, InvalidOperationException, ArgumentOutOfRangeException, ArrayIterator } from "./TypesAndHelpers";
export { IComparer, IConstructor, IEnumerable, IOrderedEnumerable, IEqualityComparer, IPrototype, RecOrdMap, ITuple } from "./Interfaces";
export { IAsyncEnumerable } from "./AsyncInterfaces";
export { ArrayEnumerable, BasicEnumerable, Enumerable } from "./Enumerable";
export { AsyncEnumerable } from "./AsyncEnumerable";
export { IArray, IArrayConstructor, bindArray, bindAllArrayTypes } from "./LinqForArray";
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void;
export declare function initializeLinq(): void;
