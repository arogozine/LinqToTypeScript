import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

export async function elementAtOrDefault<TSource>(
    source: IParallelEnumerable<TSource>,
    index: number): Promise<TSource | null> {
    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return dataFunc.generator().then((values) => {
                if (index >= values.length) {
                    return null
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(dataFunc.generator()).then((values) => {
                if (index >= values.length) {
                    return null
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.PromiseOfPromises:
            return dataFunc.generator().then(async (values) => {
                if (index >= values.length) {
                    return null
                } else {
                    return await values[index]
                }
            })
    }
}
