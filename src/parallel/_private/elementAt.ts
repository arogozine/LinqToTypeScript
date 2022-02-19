import { ArgumentOutOfRangeException } from "../../shared"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

export const elementAt = async <TSource>(
    source: IParallelEnumerable<TSource>,
    index: number): Promise<TSource> => {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            if (index >= values.length) {
                throw new ArgumentOutOfRangeException("index")
            } else {
                return values[index]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()

            if (index >= promises.length) {
                throw new ArgumentOutOfRangeException("index")
            } else {
                return await promises[index]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const promises = await dataFunc.generator()
            if (index >= promises.length) {
                throw new ArgumentOutOfRangeException("index")
            } else {
                return await promises[index]
            }
        }
    }
}
