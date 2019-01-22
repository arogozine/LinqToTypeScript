import { IEnumerable, IParallelEnumerable } from "../types";
export interface IFlatten<TElement> extends IEnumerable<TElement | IFlatten<TElement>> {
}
export interface IAsyncFlatten<TElement> extends AsyncIterable<TElement | IAsyncFlatten<TElement>> {
}
export interface IParallelFlatten<TElement> extends IParallelEnumerable<TElement | IParallelFlatten<TElement>> {
}
