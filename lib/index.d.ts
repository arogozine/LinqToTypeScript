import { IConstructor } from "./shared/shared";
export * from "./shared/shared";
export * from "./sync/sync";
export * from "./async/async";
export * from "./parallel/parallel";
export interface IPrototype<T, Y extends Iterable<T>> extends IConstructor<{
    [key: string]: any;
}> {
    new (_?: any): Y;
}
export declare function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void;
export declare function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<T, Y>): void;
export declare function initializeLinq(): void;
