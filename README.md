# LINQ To TypeScript
- **Implementation of [LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query) for TypeScript**
- **Targets TypeScript 4.5.X and ES 2019**
```TypeScript
await from([bing, google, quackQuackGo])
    .asParallel()
    .selectAsync(downloadHtml)
    .select(getTitle)
    .toArray()
```
## Getting Started
```sh
npm i linq-to-typescript
```
[![npm](https://img.shields.io/npm/v/linq-to-typescript?color=brightgreen&style=flat-square)][npm-url]
[![npm bundle size](https://img.shields.io/bundlephobia/min/linq-to-typescript?color=brightgreen&style=flat-square)][npm-url]
[![License](https://img.shields.io/npm/l/linq-to-typescript?color=brightgreen&style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/dw/linq-to-typescript?color=brightgreen&style=flat-square)][npm-url]
[![][master-build-azure-badge]][master-build-azure-url]

[npm-url]: https://www.npmjs.com/package/linq-to-typescript
[master-build-azure-url]: https://arogozine.visualstudio.com/LinqToTypeScript/_build/latest?definitionId=7&branchName=master
[master-build-azure-badge]: https://arogozine.visualstudio.com/LinqToTypeScript/_apis/build/status/arogozine.LinqToTypeScript?branchName=master

### tsconfig.json
```JSON
"compilerOptions": {
    "target": "es2019",
    "lib": [
      "es2019"
    ]
}
```
* The `strict` TS option is recommended.

### Using the Library
#### With Wrappers
```TypeScript
// 0. Import Module
import { from } from "linq-to-typescript"

// To Use With Wrappers
const evenNumbers = from([1, 2, 3, 4, 5, 6, 7, 8, 9]).where((x) => x % 2 === 0).toArray()
```
#### Without Wrappers
```TypeScript
// 0. Import Module
import { initializeLinq, IEnumerable } from "linq-to-typescript"
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
    interface Map<K, V> extends IEnumerable<[K, V]> { }
    interface Set<T> extends IEnumerable<T> { }
    interface String extends IEnumerable<string> { }
}
// 2. Bind Linq Functions to Array, Map, etc
initializeLinq()
// 3. Use without a wrapper type
const evenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].where((x) => x % 2 === 0).toArray()
```

### Examples

Please refer to the [examples folder](/examples)

### ES6 Modules (ESM)

To use library with ES6 modules make sure that you specify `"type": "module"` in package.json

## API

[TypeDoc API Surface Documentation](https://arogozine.github.io/linqtotypescript/)

**LinqToTypeScript implements the functionality of the IEnumerable interface**

- IEnumerable, IAsyncEnumerable, and IParallelEnumerable interfaces are based on,
- [IEnumerable&lt;T&gt; Interface](https://msdn.microsoft.com/en-us/library/9eekhta0(v=vs.110).aspx)
- Some changes made due to conflics with existing method names
- Some changes made due to limitations of JavaScript

#### IEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IAsyncEnumerable`
- Implements `Iterable<T>` 
- Use `from` to wrap your arrays

#### IAsyncEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IAsyncEnumerable`
- For asynchronous iteration
- Implements `AsyncIterable<T>` interface
- Use `fromAsync` to wrap your AsyncIterable type

#### IParallelEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IParallelEnumerable`
- For asynchronous iteration in parallel (where possible)
- Implements `AsyncIterable<T>` interface
- Use `fromParallel` to create a parallel enumeration

#### Shared Instance Methods

| Method             | Async\* | Tests Coverage | Notes |
|--------------------|---------|----------------|-------|
| aggregate          | No      | [Sync](tests/unittests/tests/Aggregate.ts)
| all                | Yes     | [Sync](tests/unittests/tests/All.ts), [Async](tests/unittests/tests/AllAsync.ts)
| any                | Yes     | [Sync](tests/unittests/tests/Any.ts), [Async](tests/unittests/tests/AnyAsync.ts)
| average            | Yes     | [Sync](tests/unittests/tests/Average.ts), [Async](tests/unittests/tests/AverageAsync.ts)
| chunk              | No      | [Sync](tests/unittests/tests/Chunk.ts)
| concatenate        | No      | [Sync](tests/unittests/tests/Concatenate.ts) | Equivalent to `.Concat` but renamed to avoid conflict with JS
| contains           | Yes     | [Sync](tests/unittests/tests/Contains.ts), [Async](tests/unittests/tests/ContainsAsync.ts)
| count              | Yes     | [Sync](tests/unittests/tests/Count.ts), [Async](tests/unittests/tests/CountAsync.ts)
| defaultIfEmpty     | No      | [Sync](tests/unittests/tests/DefaultIfEmpty.ts)
| distinct           | Yes     | [Sync](tests/unittests/tests/Distinct.ts), [Async](tests/unittests/tests/DistinctAsync.ts)
| elementAt          | No      | [Sync](tests/unittests/tests/ElementAt.ts)
| elementAtOrDefault | No      | [Sync](tests/unittests/tests/ElementAtOrDefault.ts)
| except             | Yes     | [Sync](tests/unittests/tests/Except.ts), [Async](tests/unittests/tests/ExceptAsync.ts)
| first              | Yes     | [Sync](tests/unittests/tests/First.ts), [Async](tests/unittests/tests/FirstAsync.ts)
| firstOrDefault     | Yes     | [Sync](tests/unittests/tests/FirstOrDefault.ts), [Async](tests/unittests/tests/FirstOrDefaultAsync.ts)
| each               | Yes     | [Sync](tests/unittests/tests/Each.ts), [Async](tests/unittests/tests/EachAsync.ts) | From `List<T>.ForEach`
| groupBy            | Yes     | [Sync](tests/unittests/tests/GroupBy.ts), [Async](tests/unittests/tests/GroupByAsync.ts)
| groupByWithSel     | No      | [Sync](tests/unittests/tests/GroupByWithSel.ts)
| groupJoin          | Yes     | [Sync](tests/unittests/tests/GroupJoin.ts), [Async](/tests/unittests/tests/GroupJoinAsync.ts)
| intersect          | Yes     | [Sync](tests/unittests/tests/Intersect.ts), [Async](tests/unittests/tests/IntersectAsync.ts)
| joinByKey          | No      | [Sync](tests/unittests/tests/JoinByKey.ts)
| last               | Yes     | [Sync](tests/unittests/tests/Last.ts), [Async](tests/unittests/tests/LastAsync.ts)
| lastOrDefault      | Yes     | [Sync](tests/unittests/tests/LastOrDefault.ts), [Async](tests/unittests/tests/LastOrDefaultAsync.ts)
| max                | Yes     | [Sync](tests/unittests/tests/Max.ts), [Async](tests/unittests/tests/MaxAsync.ts)
| min                | Yes     | [Sync](tests/unittests/tests/Min.ts), [Async](tests/unittests/tests/MinAsync.ts)
| ofType             | No      | [Sync](tests/unittests/tests/OfType.ts)
| orderBy            | Yes     | [Sync](tests/unittests/tests/OrderBy.ts), [Async](tests/unittests/tests/OrderByAsync.ts)
| orderByDescending  | Yes     | [Sync](tests/unittests/tests/OrderByDescending.ts), [Async](tests/unittests/tests/OrderByDescendingAsync.ts)
| partition          | Yes     | [Sync](tests/unittests/tests/Partition.ts), [Async](tests/unittests/tests/PartitionAsync.ts)
| reverse            | No      | [Sync](tests/unittests/tests/Reverse.ts)
| select             | Yes     | [Sync](tests/unittests/tests/Select.ts), [Async](tests/unittests/tests/SelectAsync.ts)
| selectMany         | Yes     | [Sync](tests/unittests/tests/SelectMany.ts), [Async](tests/unittests/tests/SelectManyAsync.ts)
| sequenceEquals     | Yes     | [Sync](tests/unittests/tests/SequenceEquals.ts), [Async](tests/unittests/tests/SequenceEqualAsync.ts)
| single             | Yes     | [Sync](tests/unittests/tests/Single.ts), [Async](tests/unittests/tests/SingleAsync.ts)
| singleOrDefault    | Yes     | [Sync](tests/unittests/tests/SingleOrDefault.ts), [Async](tests/unittests/tests/SingleOrDefaultAsync.ts)
| skip               | No      | [Sync](tests/unittests/tests/Skip.ts)
| skipWhile          | Yes     | [Sync](tests/unittests/tests/SkipWhile.ts), [Async](tests/unittests/tests/SkipWhileAsync.ts)
| sum                | Yes     | [Sync](tests/unittests/tests/Sum.ts), [Async](tests/unittests/tests/SumAsync.ts)
| take               | No      | [Sync](tests/unittests/tests/Take.ts)
| takeWhile          | Yes     | [Sync](tests/unittests/tests/TakeWhile.ts), [Async](tests/unittests/tests/TakeWhileAsync.ts)
| toArray            | No      | [Sync](tests/unittests/tests/ToArray.ts)
| toMap              | Yes     | [Sync](tests/unittests/tests/ToMap.ts), [Async](tests/unittests/tests/ToMapAsync.ts) | Equivalent to `ToDictionary`
| toObject           | Yes     | [Sync](tests/unittests/tests/toObject.ts), [Async](tests/unittests/tests/toObjectAsync.ts)
| toSet              | No      | [Sync](tests/unittests/tests/ToSet.ts) | Equivalent to `ToHashSet`. No comparer overload for JS.
| union              | Yes     | [Sync](tests/unittests/tests/Union.ts)
| where              | Yes     | [Sync](tests/unittests/tests/Where.ts), [Async](tests/unittests/tests/WhereAsync.ts)
| zip                | Yes     | [Sync](tests/unittests/tests/Zip.ts), [Async](tests/unittests/tests/ZipAsync.ts)

\* Async methods take an async function

#### Static Methods

| Method          | Async                | Parallel          | Tests Coverage |
|-----------------|----------------------|-------------------|----------------|
| empty           | emptyAsync           | emptyParallel     | [Test](tests/unittests/tests/staticmethods/Empty.ts)
| enumerateObject | enumerateObjectAsync | N/A               | [Test](tests/unittests/tests/staticmethods/EnumerateObject.ts)
| flatten         | flattenAsync         | flattenParallel   | [Test](tests/unittests/tests/staticmethods/Flatten.ts)
| range           | rangeAsync           | rangeParallel     | [Test](tests/unittests/tests/staticmethods/Range.ts)
| repeat          | repeatAsync          | repeatParallel    | [Test](tests/unittests/tests/staticmethods/Repeat.ts)

#### Index Methods

| Method               | Notes                                                   |
|----------------------|---------------------------------------------------------|
| bindArray            | Binds IEnumerable methods to an ArrayLike Iterable type |
| bindLinq             | Binds IEnumerable methods to an Interable type          |
| bindLinqAsync        | Binds IAsyncEnumerable methods to an AsyncIterable type |
| isEnumerable         | Determines if source implements IEnumerable             |
| isAsyncEnumerable    | Determines if source implements IAsyncEnumerable        |
| isParallelEnumerable | Determines if source implements IParallelEnumerable     |
| initializeLinq       | Binds to IEnumerable to Array Types, Map, Set, & String |

#### Exception Types

| Exception                   | Notes                                            |
|-----------------------------|--------------------------------------------------|
| ArgumentOutOfRangeException | Thrown when a passed in argument is invalid      |
| InvalidOperationException   | Thrown when no elements or no predicate match    |

### Design

#### Binding new APIs to Array Types
JavaScript doesn't have extension methods like in C#, therefore we extend the class itself with new methods.
Call ```initializeLinq``` to bind library functions to default Array methods, 

The following collections support ```IEnumerable```,
* `Array`
* `Map`
* `Set`
* `String`
* `Int8Array`
* `Int16Array`
* `Int32Array`
* `Uint8Array`
* `Uint8ClampedArray`
* `Uint16Array`
* `Uint32Array`
* `Float32Array`
* `Float64Array`

#### Using Wrappers
NOTE: Wrappers are safer as they won't interfere with other libraries.

```TypeScript
// To Create an IEnumerable<T>
import { from } from "linq-to-typescript"
from(iterableIteratorOrArray)

// To Create an IAsyncEnumerable<T>
import { fromAsync } from "linq-to-typescript"
fromAsync(asyncIterableIteratorOrPromiseArray)

// To Create an IParallelEnumerable<T>
// You have to specify the parallel generator function type
import { fromParallel, ParallelGeneratorType } from "linq-to-typescript"
fromParallel(ParallelGeneratorType.PromiseToArray, asyncFuncThatReturnsAnArray)
```

### Issues and Questions

**Q1: How does this compare to other LINQ libraries?**

Other libraries tend to use eager evaluation and work with arrays instead of iterables.

**Q2: Can I use your code?**

With attribution; the code is licensed under MIT.

**Q3: Why should I use this instead of lodash or something similar?**

The whole library is written in TypeScript first and avoids typechecking done by TypeScript Language Service.

Lazy evaluation. Not much happens until you iterate over the enumerable or conver it to an Array, Map, etc.

**Q4: Is IE11 supported?**

No.

**Q5: Can I contribute?**

Please do!