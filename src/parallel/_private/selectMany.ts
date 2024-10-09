import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"
import { nextIterationWithIndex } from "./_nextIterationWithIndex"

type SelectManyFunc = {
    <TSource, OUT>(
        source: IParallelEnumerable<TSource>,
        selector: (x: TSource, index: number) => Iterable<OUT>): IParallelEnumerable<OUT>
    <TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
        source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
}


export const selectMany: SelectManyFunc = <TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: ((x: TSource, index: number) => Iterable<OUT>) | keyof TSource): IParallelEnumerable<any> => {
    const generator = async () => {
        let values: TypedData<Iterable<OUT>>
        if (typeof selector === "function") {
            if (selector.length === 1) {
                values = nextIteration(source, selector as (x: TSource) => Iterable<OUT>)
            } else {
                values = nextIterationWithIndex(source, selector)
            }
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            values = nextIteration(source, (x: any) => x[selector])
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray: {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.ArrayOfPromises: {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises: {
                for (const outer of await values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
        }
        return valuesArray
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
