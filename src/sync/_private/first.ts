import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException} No Elements in Iteration
 */
export function first<TSource>(source: Iterable<TSource>): TSource
/**
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
export function first<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource
export function first<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

function first_1<T>(source: Iterable<T>) {
    // tslint:disable-next-line:no-shadowed-variable
    const first = source[Symbol.iterator]().next()

    if (first.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return first.value
}

function first_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): T {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
