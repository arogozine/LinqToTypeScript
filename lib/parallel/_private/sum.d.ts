import { IAsyncParallel } from "../../types";
export declare function sum(source: IAsyncParallel<number>): Promise<number>;
export declare function sum<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>;
