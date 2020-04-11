import { IEnumerable, IParallelEnumerable } from "../types"
import { IAsyncEnumerable } from '../sync'

/**
 * Represents an iteration that can be flattened.
 */
export type IFlatten<TElement> =
    IEnumerable<TElement> | IEnumerable<IFlatten<TElement>>

/**
 * Represents an async iteration that can be flattened.
 */
export type IAsyncFlatten<TElement> =
    IAsyncEnumerable<TElement> | IAsyncEnumerable<IAsyncFlatten<TElement>>

/**
 * Represents an async parallel iteration that can be flattened.
 */
export type IParallelFlatten<TElement> =
    IParallelEnumerable<TElement> | IParallelEnumerable<IParallelEnumerable<TElement>>