import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

type SelectManyFunc = {
    <TSource, TResult>(
        source: Iterable<TSource>,
        selector: (x: TSource, index: number) => Iterable<TResult>): IEnumerable<TResult>
    <TSource extends { [key: string]: Iterable<TResult>}, TResult>(
            source: Iterable<TSource>,
            selector: keyof TSource): IEnumerable<TResult>
}


export const selectMany: SelectManyFunc = <TSource extends { [key: string]: Iterable<TResult>}, TResult>(
    source: Iterable<TSource>,
    selector: ((x: TSource, index: number) => Iterable<TResult>) | keyof TSource) => {
    if (typeof selector === "function") {
        if (selector.length === 1)  {
            return selectMany1(source, selector as (x: TSource) => Iterable<TResult>)
        } else {
            return selectMany2(source, selector)
        }
    } else {
        return selectMany3(source, selector)
    }
}

const selectMany1 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Iterable<TResult>) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}

const selectMany2 = <TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource, index: number) => Iterable<TResult>) => {
    function* iterator() {
        let index = 0
        for (const value of source) {
            for (const selectorValue of selector(value, index)) {
                yield selectorValue
            }
            index++
        }
    }

    return new BasicEnumerable(iterator)
}

const selectMany3 = <TSource extends { [key: string]: Iterable<TResult> }, TResult>(
    source: Iterable<TSource>, selector: keyof TSource) => {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue
            }
        }
    }

    return new BasicEnumerable(iterator)
}
