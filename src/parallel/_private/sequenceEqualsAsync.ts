import { IAsyncEqualityComparer, IAsyncParallel } from "../../types"

export async function sequenceEqualsAsync<TSource>(
    // tslint:disable-next-line:no-shadowed-variable
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IAsyncEqualityComparer<TSource>): Promise<boolean> {

    const firstArray = await first.toArray()
    const secondArray = await second.toArray()

    if (firstArray.length !== secondArray.length) {
        return false
    }

    for (let i = 0; i < firstArray.length; i++) {
        const firstResult = firstArray[i]
        const secondResult = secondArray[i]

        if (await comparer(firstResult, secondResult) === false) {
            return false
        }
    }

    return true
}
