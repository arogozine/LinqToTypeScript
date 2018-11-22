import { ArgumentOutOfRangeException } from "../../shared/ArgumentOutOfRangeException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

export async function elementAt<TSource>(
    source: IParallelEnumerable<TSource>,
    index: number): Promise<TSource> {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return dataFunc.generator().then((values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(dataFunc.generator()).then((values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.PromiseOfPromises:
            return dataFunc.generator().then(async (values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return await values[index]
                }
            })
    }
}
