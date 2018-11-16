import { IEqualityComparer } from "../../shared/IEqualityComparer"
import { IGrouping } from "../../shared/IGrouping"
import { BasicEnumerable } from "../BasicEnumerable"
import { Grouping } from "../Grouping"
import { IEnumerable } from "../IEnumerable"

export function groupBy_0<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>> {

    function *generate(): IterableIterator<IGrouping<TKey, TSource>> {

        const keyMap = new Array<Grouping<TKey, TSource>>()

        for (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(value)
                    found = true
                    break
                }
            }

            if (found === false) {
                keyMap.push(new Grouping<TKey, TSource>(key, value))
            }

        }

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return new BasicEnumerable(generate)
}

export function groupBy_0_Simple<TSource>(
    source: Iterable<TSource>,
    keySelector: ((x: TSource) => string) | ((x: TSource) => number)):
        IEnumerable<IGrouping<string | number, TSource>> {

    function *iterator(): IterableIterator<IGrouping<string | number, TSource>> {
        const keyMap: {[key: string]: Grouping<string | number, TSource>} = {}
        for (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TSource> = keyMap[key]

            if (grouping) {
                grouping.push(value)
            } else {
                keyMap[key] = new Grouping<string | number, TSource>(key, value)
            }
        }

        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value]
        }
    }

    return new BasicEnumerable(iterator)
}

export function groupBy_1_Simple<TSource, TElement>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => string | number,
    elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string | number, TElement>> {

    function *generate(): IterableIterator<IGrouping<string | number, TElement>> {
        const keyMap: { [key: string]: Grouping<string | number, TElement> } = {}
        for (const value of source) {

            const key = keySelector(value)
            const grouping: Grouping<string | number, TElement> = keyMap[key]
            const element = elementSelector(value)

            if (grouping) {
                grouping.push(element)
            } else {
                keyMap[key] = new Grouping<string | number, TElement>(key, element)
            }
        }

        /* tslint:disable:forin */
        for (const value in keyMap) {
            yield keyMap[value]
        }
        /* tslint:enable:forin */
    }

    return new BasicEnumerable(generate)
}

export function groupBy_1<TSource, TKey, TElement>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    elementSelector: (x: TSource) => TElement,
    comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>> {

    function *generate(): IterableIterator<IGrouping<TKey, TElement>> {
        const keyMap = new Array<Grouping<TKey, TElement>>()
        for (const value of source) {
            const key = keySelector(value)
            let found = false

            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i]
                if (comparer(group.key, key)) {
                    group.push(elementSelector(value))
                    found = true
                    break
                }
            }

            if (found === false) {
                const element = elementSelector(value)
                keyMap.push(new Grouping<TKey, TElement>(key, element))
            }

        }

        for (const keyValue of keyMap) {
            yield keyValue
        }
    }

    return new BasicEnumerable(generate)
}
