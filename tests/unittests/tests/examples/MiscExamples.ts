import {
    enumerateObject, EqualityComparer, flatten, IEnumerable } from "linq-to-typescript"

// tslint:disable:interface-name
// tslint:disable:no-console
// tslint:disable:no-shadowed-variable

declare global {
    interface Array<T> extends IEnumerable<T> { }
    interface Uint8Array extends IEnumerable<number> { }
    interface Uint8ClampedArray extends IEnumerable<number> { }
    interface Uint16Array extends IEnumerable<number> { }
    interface Uint32Array extends IEnumerable<number> { }
    interface Int8Array extends IEnumerable<number> { }
    interface Int16Array extends IEnumerable<number> { }
    interface Int32Array extends IEnumerable<number> { }
    interface Float32Array extends IEnumerable<number> { }
    interface Float64Array extends IEnumerable<number> { }
    interface Map<K, V> extends IEnumerable<[K, V]> { }
    interface Set<T> extends IEnumerable<T> { }
    interface String extends IEnumerable<string> { }
}

describe("miscExamples", () => {
    it("miscExamples", () => {
        // AGGREGATE
        [1, 2].aggregate((x, y) => x + y); // 3
        ["f", "o", "o"].aggregate((x, y) => x + y); // "foo"
        [1, 2, 3].aggregate(4, (acc, x) => acc + x); // 10
        [1, 2, 3].aggregate("seed", (acc, y) => acc + y, (acc) => acc + "result"); // "seed123result"

        // ALL
        [1, 2].all((x) => x < 3); // true
        [1, 2].all((x) => x < 2); // false

        // ANY
        [0].any(); // true
        [true].any((x) => !x); // false

        // APPEND
        [1, 2].append(3); // [1, 2, 3]

        // CONCAT
        [1, 2].concatenate([2, 3]); // [1, 2, 2, 3]

        // CONTAINS
        [1, 2, 3].contains(1); // true
        [1, "2", "3"].contains(2, EqualityComparer); // true

        // COUNT
        [1, 2, 3].count(); // 3
        [true, true, false].count((x) => x); // false

        // DISTINCT
        ["f", "o", "o"].distinct(); // "foo"
        ["1", 1, 2, 2, 3, "3"].distinct(EqualityComparer) // ["1", 2, 3]

        // ENUMERATEOBJECT
        for (const item of enumerateObject({ cat: "catto", dog: "doggo" })) {
            console.log(item)
        }

        // EACH
        let y = 0;
        [1, 2].each((x) => y += x);

        // ELEMENTAT
        [1, 2].elementAt(1); // 2

        // ELEMENTATORDEFAULT
        [1, 2].elementAtOrDefault(3); // null

        // EXCEPT
        [1, 2].except([1]); // [2]
        ([1, 2] as IEnumerable<string | number>).except(["1"], EqualityComparer); // [2]

        // FIRST
        [1, 2].first(); // 1
        [1, 2].first((x) => x === 2); // 2

        // FIRSTORDEFAULT
        [].firstOrDefault() // null

        // FLATTEN
        flatten([1, [2, 3]]) // [1, 2, 3]

        // GROUPBY
        const cats = [] as Array<{ breed: string, age: number }>
        const groupByBreed = cats.groupBy((cat) => cat.breed);

        // INTERSECT
        [1, 2, 3].intersect([1, 2]); // [1, 2]
        [1, 2, "3"].intersect(["1", "2"], EqualityComparer); // [1, 2]

        // TAKE
        [1, 2, 3, 4, 5].take(2); // [1, 2]

        // LAST
        [1, 2].last(); // 2
        [1, 2].last((x) => x === 1); // 1

        // LASTORDEFAULT
        [].lastOrDefault(); // null
        [1, 2, 3].lastOrDefault((x) => x === 4); // null

        // MAX
        [1, 2, 3].max(); // 3
        [1, 2, 3].max((x) => x * x); // 9

        // MIN
        [1, 2, 3, -7].min(); // -7
        [1, 2, 3, -7].min(Math.abs); // 1

        // OFTYPE
        ["str", "str2", 1, 2, 3, {}].ofType("string"); // ["str", "str2"]
        [1, 2, "4", false, true].ofType("boolean"); // [false, true]

        // ORDERBY
        [3, 4, 7, 0, 1].orderBy((x) => x); // [0, 1, 3, 4, 7]

        // PREPEND
        [1, 2].prepend(3); // [3, 1, 2]

        // REVERSE
        [1, 2, 3].reverse(); // [3, 2, 1]

        // SELECT
        [1, 2, 3].select((x) => x * 10); // [10, 20, 30]

        // SELECTMANY
        [1, 2, 3].selectMany((x) => [x, x * x]); // [1, 1, 2, 4, 3, 9]

        [1, 2, 3].skip(2); // [3]

        // UNION
        [1, 2, 3].union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]

    })
})
