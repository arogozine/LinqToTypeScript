import { IEnumerable } from "./Interfaces";
export interface IArray<T, Y> extends ArrayLike<T>, IEnumerable<T> {
    every(callbackfn: (value: T, index: number, array: Y) => boolean, thisArg?: any): boolean;
    find(predicate: (value: T, index: number, obj: any) => boolean, thisArg?: any): T | undefined;
    slice(start?: number, end?: number): Y;
    filter(callbackfn: (value: T, index: number, array: Y) => any, thisArg?: any): Y;
    some(callbackfn: (value: T, index: number, array: Y) => boolean, thisArg?: any): boolean;
}
export interface IArrayConstructor<T, Y extends IArray<T, Y>> {
    new (_?: any): Y;
    readonly prototype: IEnumerable<T>;
}
export declare function bindArray<T, Y extends IArray<T, Y>>(array: IArrayConstructor<T, Y>): void;
export declare const bindAllArrayTypes: () => void;
