import { IAsyncParallel } from "../../types";
export declare function average(source: IAsyncParallel<number>): Promise<number>;
export declare function average<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
