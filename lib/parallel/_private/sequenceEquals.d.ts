import { IAsyncParallel, IEqualityComparer } from "../../types";
export declare function sequenceEquals<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
