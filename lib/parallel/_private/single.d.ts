import { IParallelEnumerable } from "../../types";
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export declare function single<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource>;
export declare function single_1<TSource>(source: IParallelEnumerable<TSource>): Promise<TSource>;
export declare function single_2<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource>;
