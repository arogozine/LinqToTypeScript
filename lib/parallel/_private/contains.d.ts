import { IEqualityComparer, IParallelEnumerable } from "../../types";
export declare function contains<TSource>(source: IParallelEnumerable<TSource>, value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
