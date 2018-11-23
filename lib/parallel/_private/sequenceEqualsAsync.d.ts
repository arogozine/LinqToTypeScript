import { IAsyncEqualityComparer, IAsyncParallel } from "../../types";
export declare function sequenceEqualsAsync<TSource>(first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>, comparer: IAsyncEqualityComparer<TSource>): Promise<boolean>;
