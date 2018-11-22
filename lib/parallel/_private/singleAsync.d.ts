import { IParallelEnumerable } from "../../types";
/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
export declare function singleAsync<TSource>(source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<TSource>;
