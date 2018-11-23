import { IAsyncParallel } from "../../types";
export declare function sumAsync<TSource>(source: IAsyncParallel<TSource>, selector: (x: TSource) => Promise<number>): Promise<number>;
