import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
/**
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @returns
 * default(TSource) if the index is outside the bounds of the source sequence;
 * otherwise, the element at the specified position in the source sequence.
 */
export function elementAtOrDefault<TSource>(
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
