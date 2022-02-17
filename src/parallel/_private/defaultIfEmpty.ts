import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const defaultIfEmpty = <TSource>(source: IParallelEnumerable<TSource>, defaultValue: TSource | Promise<TSource>): IParallelEnumerable<TSource> => {
    const dataFunc = source.dataFunc
    const isPromise = defaultValue instanceof Promise
    let typeData: TypedData<TSource>
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
                const generator = () => dataFunc
                    .generator()
                    .then((values) => {
                        if (values.length) {
                            return values
                        }

                        if (isPromise) {
                            return defaultValue.then(value => [value])
                        }
                        else {
                            return [defaultValue]
                        }
                    })

                typeData = {
                    generator,
                    type: dataFunc.type
                }
            }
            break
        case ParallelGeneratorType.ArrayOfPromises: {
                const generator = () => {
                    const promises = dataFunc.generator()
                    if (promises.length) {
                        return promises
                    }

                    if (isPromise) {
                        return [defaultValue]
                    }
                    else {
                        return [Promise.resolve(defaultValue)]
                    }
                }

                typeData = {
                    generator,
                    type: dataFunc.type
                }
            }
            break
        case ParallelGeneratorType.PromiseOfPromises: {
                const generator = async () => {
                    const promises = await dataFunc.generator()
                    if (promises.length) {
                        return promises
                    }

                    if (isPromise) {
                        return [defaultValue]
                    }
                    else {
                        return [Promise.resolve(defaultValue)]
                    }
                }

                typeData = {
                    generator,
                    type: dataFunc.type
                }
            }
            break
    }

    return new BasicParallelEnumerable(typeData)
}