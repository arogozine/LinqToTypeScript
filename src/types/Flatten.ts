import { IEnumerable, IParallelEnumerable } from "../types"

/**
 * Represents an iteration that can be flattened.
 */
export interface IFlatten<TElement> extends IEnumerable<TElement | IFlatten<TElement>> {
}

/**
 * Represents an async iteration that can be flattened.
 */
export interface IAsyncFlatten<TElement> extends AsyncIterable<TElement | IAsyncFlatten<TElement>> {
}

/**
 * Represents an async parallel iteration that can be flattened.
 */
export interface IParallelFlatten<TElement> extends IParallelEnumerable<TElement | IParallelFlatten<TElement>> {
}
