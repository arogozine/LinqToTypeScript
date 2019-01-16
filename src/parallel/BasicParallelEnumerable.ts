import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../types"

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
        const thisOuter = this
        async function *iterator() {
            const dataFunc = thisOuter.dataFunc
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

// tslint:disable-next-line:interface-name
export interface BasicParallelEnumerable<TSource> extends IParallelEnumerable<TSource> {

}
