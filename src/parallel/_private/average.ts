import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"
import { IAsyncParallel } from "../../types"

export function average(
    source: IAsyncParallel<number>): Promise<number>
export function average<TSource>(
    source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: IAsyncParallel<TSource> | IAsyncParallel<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return average_2(source as IAsyncParallel<TSource>, selector)
    } else {
        return average_1(source as IAsyncParallel<number>)
    }
}

async function average_1(source: IAsyncParallel<number>): Promise<number> {
    let value: number | undefined
    let itemCount: number | undefined
    for (const item of await source.toArray()) {
        value = (value || 0) + item
        itemCount = (itemCount || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (itemCount as number)
}

async function average_2<TSource>(
    source: IAsyncParallel<TSource>, func: (x: TSource) => number): Promise<number> {
    let value: number | undefined
    // tslint:disable-next-line:no-shadowed-variable
    let count: number | undefined
    for (const item of await source.toArray()) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
