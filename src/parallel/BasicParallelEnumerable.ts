import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../types"

/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface */

/**
 * Base implementation of IParallelEnumerable<T>
 * @private
 */
export class BasicParallelEnumerable<TSource> {
    public readonly dataFunc: TypedData<TSource>

    public constructor(dataFunc: TypedData<TSource>) {
        this.dataFunc = dataFunc
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<TSource> {
        const { dataFunc } = this
        async function *iterator() {
            switch (dataFunc.type) {
                case ParallelGeneratorType.ArrayOfPromises:
                    for (const value of dataFunc.generator()) {
                        yield value
                    }
                    break
                case ParallelGeneratorType.PromiseOfPromises:
                    for (const value of await dataFunc.generator()) {
                        yield value
                    }
                    break
                case ParallelGeneratorType.PromiseToArray:
                default:
                    for (const value of await dataFunc.generator()) {
                        yield value
                    }
                    break
            }
        }

        return iterator()
    }
}

/**
 * Workaround for circular reference issues in JS
 * @private
 */
export interface BasicParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {

}
