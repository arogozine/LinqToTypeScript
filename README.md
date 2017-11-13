# Linq To TypeScript
Linq to TypeScript

- Implementation of LINQ for TypeScript
- Targets TypeScript 2.6 and ES 2016

### Getting Started

#### tsconfig.json
```JSON
"compilerOptions": {
    "target": "es2016",
    "lib": [
      "dom",
      "es2016",
      "esnext.asynciterable"      
    ],
}
```

#### TypeScript
```TypeScript
// 0. Import Module
import { ArrayEnumerable, Enumerable, AsyncEnumerable, initializeLinq } from "linq-to-typescript"

// To Use With Wrappers
const evenNumbers = Enumerable.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).where((x) => x % 2 === 0).toArray()

// To Use Without Wrappers
// 1. Declare that the JS types implement the IEnumerable interface
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
    interface Map<K,V> extends IEnumerable<[K,V]> { }
    interface Set<T> extends IEnumerable<T> { }
}
// 2. Bind Linq Functions to Array and Map
initializeLinq()
// 3. Use without a wrapper type
const evenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].where((x) => x % 2 === 0).toArray()
```

### API

**LinqToTypeScript implements the functionality of the IEnumerable interface**

- IEnumerable and IAsyncEnumerable interfaces based on,
- [IEnumerable&lt;T&gt; Interface](https://msdn.microsoft.com/en-us/library/9eekhta0(v=vs.110).aspx)
- Some changes made due to conflics with existing method names
- Some changes made due to limitations of JavaScript

#### IEnumerable
```TypeScript
interface IEnumerable<TSource> extends Iterable<TSource> {
    aggregate: {
        (func: (x: TSource, y: TSource) => TSource): TSource;
        <TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate;
        <TAccumulate, TResult>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): TResult;
    };
    all: {
        (predicate: (x: TSource) => boolean): boolean;
    };
    any: {
        (predicate?: (x: TSource) => boolean): boolean;
    };
    average: {
        (this: IEnumerable<number>): number;
        (selector: (x: TSource) => number): number;
    };
    concat: {
        (second: IEnumerable<TSource>): IEnumerable<TSource>;
    };
    contains: {
        (value: TSource, comparer?: IEqualityComparer<TSource>): boolean;
    };
    count: {
        (predicate?: (x: TSource) => boolean): number;
    };
    distinct: {
        (comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    };
    elementAt: {
        (index: number): TSource;
    };
    elementAtOrDefault: {
        (index: number): TSource | null;
    };
    except: {
        (second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    };
    first: {
        (predicate?: (x: TSource) => boolean): TSource;
    };
    firstOrDefault: {
        (predicate?: (x: TSource) => boolean): TSource | null;
    };
    each: {
        (action: (x: TSource) => void): IEnumerable<TSource>;
    };
    groupBy: {
        (keySelector: (x: TSource) => number): IEnumerable<IGrouping<number, TSource>>;
        (keySelector: (x: TSource) => string): IEnumerable<IGrouping<string, TSource>>;
        <TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TSource>>;
    };
    groupByWithSel: {
        <TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<number, TElement>>;
        <TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IEnumerable<IGrouping<string, TElement>>;
        <TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IEnumerable<IGrouping<TKey, TElement>>;
    };
    intersect: {
        (second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    };
    joinByKey: {
        <TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IEnumerable<TResult>;
    };
    last: {
        (predicate?: (x: TSource) => boolean): TSource;
    };
    lastOrDefault: {
        (predicate?: (x: TSource) => boolean): TSource | null;
    };
    max: {
        (this: IEnumerable<number>): number | never;
        (selector: (x: TSource) => number): number | never;
    };
    min: {
        (this: IEnumerable<number>): number | never;
        (selector: (x: TSource) => number): number | never;
    };
    ofType: {
        (type: "object"): IEnumerable<Object>;
        (type: "function"): IEnumerable<Function>;
        (type: "symbol"): IEnumerable<Symbol>;
        (type: "boolean"): IEnumerable<boolean>;
        (type: "number"): IEnumerable<number>;
        (type: "string"): IEnumerable<string>;
        <TResult>(type: IConstructor<TResult>): IEnumerable<TResult>;
    };
    orderBy: {
        (predicate: (x: TSource) => number | string): IOrderedEnumerable<TSource>;
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>;
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>;
    };
    orderByDescending: {
        (predicate: (x: TSource) => number | string): IOrderedEnumerable<TSource>;
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedEnumerable<TSource>;
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedEnumerable<TSource>;
    };
    reverse: {
        (): IEnumerable<TSource>;
    };
    select: {
        <OUT>(selector: (x: TSource) => OUT): IEnumerable<OUT>;
        <TKey extends keyof TSource>(key: TKey): IEnumerable<TSource[TKey]>;
    };
    selectMany: {
        <OUT>(selector: (x: TSource) => Iterable<OUT>): IEnumerable<OUT>;
        <TBindedSource extends {
            [key: string]: Iterable<TOut>;
        }, TOut>(this: IEnumerable<TBindedSource>, selector: keyof TBindedSource): IEnumerable<TOut>;
    };
    sequenceEquals: {
        (second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): boolean;
    };
    single: {
        (predicate?: (x: TSource) => boolean): TSource;
    };
    singleOrDefault: {
        (predicate?: (x: TSource) => boolean): TSource | null;
    };
    skip: {
        (count: number): IEnumerable<TSource>;
    };
    skipWhile: {
        (predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    };
    sum: {
        (this: IEnumerable<number>): number;
        (this: IEnumerable<TSource>, selector: (x: TSource) => number): number;
    };
    take: {
        (amount: number): IEnumerable<TSource>;
    };
    takeWhile: {
        (predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    };
    toArray: {
        (): TSource[];
    };
    toMap: {
        <TKey>(selector: (x: TSource) => TKey): Map<TKey, TSource[]>;
    };
    toSet: {
        (): Set<TSource>;
    };
    union: {
        (second: IEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>;
    };
    where: {
        (predicate: (x: TSource, index: number) => boolean): IEnumerable<TSource>;
    };
    zip: {
        <TSecond>(second: Iterable<TSecond>): IEnumerable<ITuple<TSource, TSecond>>;
        <TSecond, TResult>(second: Iterable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IEnumerable<TResult>;
    };
    [Symbol.iterator]: () => IterableIterator<TSource>;
}
```

#### IAsyncEnumerable
```TypeScript
interface IAsyncEnumerable<TSource> extends AsyncIterable<TSource> {
    aggregate: {
        (func: (x: TSource, y: TSource) => TSource): Promise<TSource>;
        <TAccumulate>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>;
        <TAccumulate, TResult>(seed: TAccumulate, func: (x: TAccumulate, y: TSource) => TAccumulate, resultSelector: (x: TAccumulate) => TResult): Promise<TResult>;
    };
    all: {
        (predicate: (x: TSource) => boolean): Promise<boolean>;
    };
    any: {
        (predicate?: (x: TSource) => boolean): Promise<boolean>;
    };
    average: {
        (this: IAsyncEnumerable<number>): Promise<number>;
        (selector: (x: TSource) => number): Promise<number>;
    };
    concat: {
        (second: IAsyncEnumerable<TSource>): IAsyncEnumerable<TSource>;
    };
    contains: {
        (value: TSource, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    };
    count: {
        (predicate?: (x: TSource) => boolean): Promise<number>;
    };
    distinct: {
        (comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    };
    each: {
        (action: (x: TSource) => void): IAsyncEnumerable<TSource>;
    };
    elementAt: {
        (index: number): Promise<TSource>;
    };
    elementAtOrDefault: {
        (index: number): Promise<TSource | null>;
    };
    except: {
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    };
    first: {
        (predicate?: (x: TSource) => boolean): Promise<TSource>;
    };
    firstOrDefault: {
        (predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    };
    groupBy: {
        (keySelector: (x: TSource) => number): IAsyncEnumerable<IGrouping<number, TSource>>;
        (keySelector: (x: TSource) => string): IAsyncEnumerable<IGrouping<string, TSource>>;
        <TKey>(keySelector: (x: TSource) => TKey, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TSource>>;
    };
    groupByWithSel: {
        <TElement>(keySelector: ((x: TSource) => number), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<number, TElement>>;
        <TElement>(keySelector: ((x: TSource) => string), elementSelector: (x: TSource) => TElement): IAsyncEnumerable<IGrouping<string, TElement>>;
        <TKey, TElement>(keySelector: ((x: TSource) => TKey), elementSelector: (x: TSource) => TElement, comparer: IEqualityComparer<TKey>): IAsyncEnumerable<IGrouping<TKey, TElement>>;
    };
    intersect: {
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    };
    joinByKey: {
        <TInner, TKey, TResult>(inner: IAsyncEnumerable<TInner>, outerKeySelector: (x: TSource) => TKey, innerKeySelector: (x: TInner) => TKey, resultSelector: (x: TSource, y: TInner) => TResult, comparer?: IEqualityComparer<TKey>): IAsyncEnumerable<TResult>;
    };
    last: {
        (predicate?: (x: TSource) => boolean): Promise<TSource>;
    };
    lastOrDefault: {
        (predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    };
    max: {
        (this: IAsyncEnumerable<number>): Promise<number | never>;
        (selector: (x: TSource) => number): Promise<number | never>;
    };
    min: {
        (this: IAsyncEnumerable<number>): Promise<number | never>;
        (selector: (x: TSource) => number): Promise<number | never>;
    };
    ofType: {
        (type: "object"): IAsyncEnumerable<Object>;
        (type: "function"): IAsyncEnumerable<Function>;
        (type: "symbol"): IAsyncEnumerable<Symbol>;
        (type: "boolean"): IAsyncEnumerable<boolean>;
        (type: "number"): IAsyncEnumerable<number>;
        (type: "string"): IAsyncEnumerable<string>;
        <TResult>(type: IConstructor<TResult>): IAsyncEnumerable<TResult>;
    };
    orderBy: {
        (predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>;
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    };
    orderByDescending: {
        (predicate: (x: TSource) => number | string): IOrderedAsyncEnumerable<TSource>;
        (predicate: (x: TSource) => number, comparer: IComparer<number>): IOrderedAsyncEnumerable<TSource>;
        (predicate: (x: TSource) => string, comparer: IComparer<string>): IOrderedAsyncEnumerable<TSource>;
    };
    reverse: {
        (): IAsyncEnumerable<TSource>;
    };
    select: {
        <OUT>(selector: (x: TSource) => OUT): IAsyncEnumerable<OUT>;
        <TKey extends keyof TSource>(key: TKey): IAsyncEnumerable<TSource[TKey]>;
    };
    selectMany: {
        <OUT>(selector: (x: TSource) => Iterable<OUT>): IAsyncEnumerable<OUT>;
        <TBindedSource extends {
            [key: string]: Iterable<TOut>;
        }, TOut>(this: IAsyncEnumerable<TBindedSource>, selector: keyof TBindedSource): IAsyncEnumerable<TOut>;
    };
    sequenceEquals: {
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): Promise<boolean>;
    };
    single: {
        (predicate?: (x: TSource) => boolean): Promise<TSource>;
    };
    singleOrDefault: {
        (predicate?: (x: TSource) => boolean): Promise<TSource | null>;
    };
    skip: {
        (count: number): IAsyncEnumerable<TSource>;
    };
    skipWhile: {
        (predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    };
    sum: {
        (this: IAsyncEnumerable<number>): Promise<number>;
        (this: IAsyncEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>;
    };
    take: {
        (amount: number): IAsyncEnumerable<TSource>;
    };
    takeWhile: {
        (pedicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    };
    toArray: {
        (): Promise<TSource[]>;
    };
    toMap: {
        <TKey>(selector: (x: TSource) => TKey): Promise<Map<TKey, TSource[]>>;
    };
    toSet: {
        (): Promise<Set<TSource>>;
    };
    union: {
        (second: IAsyncEnumerable<TSource>, comparer?: IEqualityComparer<TSource>): IAsyncEnumerable<TSource>;
    };
    where: {
        (predicate: (x: TSource, index: number) => boolean): IAsyncEnumerable<TSource>;
    };
    zip: {
        <TSecond, TResult>(second: IAsyncEnumerable<TSecond>, resultSelector: (x: TSource, y: TSecond) => TResult): IAsyncEnumerable<TResult>;
        <TSecond>(second: IAsyncEnumerable<TSecond>): IAsyncEnumerable<ITuple<TSource, TSecond>>;
    };
    [Symbol.asyncIterator]: () => AsyncIterableIterator<TSource>;
}
```

### Examples

```TypeScript
// AGGREGATE
[1, 2].aggregate((x, y) => x + y) // 3
["f", "o", "o"].aggregate((x, y) => x + y) // "foo"
[1, 2, 3].aggregate(4, (acc, x) => acc + x) // 10
[1, 2, 3].aggregate("seed", (acc, y) => acc + y, acc => acc + "result") // "seed123result"

// ALL
[1, 2].all(x => x < 3) // true
[1, 2].all(x => x < 2) // false

// ANY
[0].any() // true
[true].any(x => !x) // false

// CONCAT
[1, 2].concat([2, 3]) // [1, 2, 2, 3]

// CONTAINS
[1, 2, 3].contains(1) // true
[1, "2", "3"].contains(2, Linq.EqualityComparer) // true

// COUNT
[1, 2, 3].count() // 3
[true, true, false].count(x => x) // false

// DISTINCT
["f", "o", "o"].distinct() // "foo"
["1", 1, 2, 2, 3, "3"].distinct(Linq.EqualityComparer) // ["1", 2, 3]

// ENUMERATEOBJECT
for (let item of Linq.Enumerable.enumerateObject(object)) {
  // ...
}

// EACH
let y = 0;
[1, 2].each(x => y += x)

// ELEMENTAT
[1, 2].elementAt(1) // 2

// ELEMENTATORDEFAULT
[1, 2].elementAtOrDefault(3) // null

// EXCEPT
[1, 2].except([1]) // [2]
([1, 2] as Linq.IEnumerable<string | number>).except(["1"], Linq.EqualityComparer) // [2]

// FIRST
[1, 2].first() // 1
[1, 2].first(x => x === 2) // 2

// FIRSTORDEFAULT
[].firstOrDefault() // null

// FLATTEN
Linq.Enumerable.flatten([1, [2, 3]]) // [1, 2, 3]

// GROUPBY
const groupByBreed = cats.groupBy(cat => cat.breed)
const groupByBreedThenAge = groupByBreed.thenBy(cat => cat.age)

// INTERSECT
[1, 2, 3].intersect([1, 2]) // [1, 2]
[1, 2, "3"].intersect(["1", "2"], Linq.EqualityComparer) // [1, 2]

// PLUCK

// TAKE
[1, 2, 3, 4, 5].take(2) // [1, 2]

// TAKEWHILE

// LAST
[1, 2].last() // 2
[1, 2].last(x => x === 1) // 1

// LASTORDEFAULT
[].lastOrDefault() // null
[1, 2, 3].lastOrDefault(x => x === 4) // null

// MAX
[1, 2, 3].max() // 3
[1, 2, 3].max(x => x * x) // 9

// MIN
[1, 2, 3, -7].min() // -7
[1, 2, 3, -7].min(Math.abs) // 1

// OFTYPE
["str", "str2", 1, 2, 3, {}].ofType("string") // ["str", "str2"]
[1, 2, "4", false, true].ofType("boolean") // [false, true]

// ORDERBY
[3, 4, 7, 0, 1].orderBy(x => x) // [0, 1, 3, 4, 7]

// REVERSE
[1, 2, 3].reverse() // [3, 2, 1]

// SELECT
[1, 2, 3].select(x => x * 10) // [10, 20, 30]

// SELECTMANY
[1, 2, 3].selectMany(x => [x, x * x]) // [1, 1, 2, 4, 3, 9]

[1, 2, 3].skip(2) // [3]

// UNION
[1, 2, 3].union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]
```

### Design

#### Binding new APIs to Array Types
JavaScript doesn't have extension methods like in C#, therefore we extend the class itself with new methods.
Call ```initializeLinq``` to bind library functions to default Array methods, 

The following collections support ```IEnumerable```,
* Array
* Map
* Set
* String
* Int8Array
* Int16Array
* Int32Array
* Uint8Array
* Uint8ClampedArray
* Uint16Array
* Uint32Array
* Float32Array
* Float64Array
#### Using Wrappers
Wrappers are safer as they won't interfere with other libraries.

```TypeScript
// To Create an IAsyncEnumerable<T>
AsyncEnumerable.from(asyncIterableIteratorOrPromiseArray)
// To Create an IEnumerable<T>
Enumerable.from(iterableIteratorOrArray)
```

The root class is ```Enumerable```. Collections simple call ```Enumerable``` methods with the first argument being ```this```

### F.A.Q.

**Q**
I am getting a `Cannot find module 'core-js/modules/es7.symbol.async-iterator'`

**A**
Ensure you have `core-js` NPM package installed.

**Q**
Why did you create this?

**A**
For fun and to gain understanding of TypeScript and Node Package Manager.

**Q**
Why not target ES5?

**A**
Backward compatibility is not a concern. You are free to recompile this targeting ES5 instead.

**Q**
How does this compare to other LINQ libraries?

**A**
They are more mature.