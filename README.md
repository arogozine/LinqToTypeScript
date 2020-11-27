# LINQ To TypeScript
- **Implementation of [LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query) for TypeScript**
- **Targets TypeScript 3.9.X and ES 2018**
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
[![npm](https://img.shields.io/npm/v/linq-to-typescript?color=brightgreen&style=flat-square)](https://www.npmjs.com/package/linq-to-typescript)
![npm bundle size](https://img.shields.io/bundlephobia/min/linq-to-typescript?color=brightgreen&style=flat-square)
[![License](https://img.shields.io/npm/l/linq-to-typescript?color=brightgreen&style=flat-square)](LICENSE)
![npm](https://img.shields.io/npm/dw/linq-to-typescript?color=brightgreen&style=flat-square)
[![][master-build-azure-badge]][master-build-azure-url]
[![][master-build-badge]][master-build-url]

[master-build-url]: https://travis-ci.com/arogozine/LinqToTypeScript
[master-build-badge]: https://travis-ci.com/arogozine/LinqToTypeScript.svg?branch=master
[master-build-azure-url]: https://arogozine.visualstudio.com/LinqToTypeScript/_build/latest?definitionId=7&branchName=master
[master-build-azure-badge]: https://arogozine.visualstudio.com/LinqToTypeScript/_apis/build/status/arogozine.LinqToTypeScript?branchName=master

### tsconfig.json
```JSON
"compilerOptions": {
    "target": "es2018",
    "lib": [
      "dom",
      "es2018"
    ],
    "importHelpers": true
}
```
* The `strict` TS option is recommended.
* Library is dependent on [tslib](https://github.com/Microsoft/tslib) for async iteration polyfills.

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
// 2. Bind Linq Functions to Array and Map
initializeLinq()
// 3. Use without a wrapper type
const evenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].where((x) => x % 2 === 0).toArray()
```

### Examples

Please refer to [EXAMPLES.md](EXAMPLES.md)

## API

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
| aggregate          | No      | [Sync](test/tests/Aggregate.ts)
| all                | Yes     | [Sync](test/tests/All.ts), [Async](test/tests/AllAsync.ts)
| any                | Yes     | [Sync](test/tests/Any.ts), [Async](test/tests/AnyAsync.ts)
| average            | Yes     | [Sync](test/tests/Average.ts), [Async](test/tests/AverageAsync.ts)
| concatenate        | No      | [Sync](test/tests/Concatenate.ts) | Equivalent to `.Concat` but renamed to avoid conflict with JS
| contains           | Yes     | [Sync](test/tests/Contains.ts), [Async](test/tests/ContainsAsync.ts)
| count              | Yes     | [Sync](test/tests/Count.ts), [Async](test/tests/CountAsync.ts)
| distinct           | Yes     | [Sync](test/tests/Distinct.ts), [Async](test/tests/DistinctAsync.ts)
| elementAt          | No      | [Sync](test/tests/ElementAt.ts)
| elementAtOrDefault | No      | [Sync](test/tests/ElementAtOrDefault.ts)
| except             | Yes     | [Sync](test/tests/Except.ts), [Async](test/tests/ExceptAsync.ts)
| first              | Yes     | [Sync](test/tests/First.ts), [Async](test/tests/FirstAsync.ts)
| firstOrDefault     | Yes     | [Sync](test/tests/FirstOrDefault.ts), [Async](test/tests/FirstOrDefaultAsync.ts)
| each               | Yes     | [Sync](test/tests/Each.ts), [Async](test/tests/EachAsync.ts) | From `List<T>.ForEach`
| groupBy            | Yes     | [Sync](test/tests/GroupBy.ts), [Async](test/tests/GroupByAsync.ts)
| groupByWithSel     | No      | [Sync](test/tests/GroupByWithSel.ts)
| intersect          | Yes     | [Sync](test/tests/Intersect.ts), [Async](test/tests/IntersectAsync.ts)
| joinByKey          | No      | [Sync](test/tests/JoinByKey.ts)
| last               | Yes     | [Sync](test/tests/Last.ts), [Async](test/tests/LastAsync.ts)
| lastOrDefault      | Yes     | [Sync](test/tests/LastOrDefault.ts), [Async](test/tests/LastOrDefaultAsync.ts)
| max                | Yes     | [Sync](test/tests/Max.ts), [Async](test/tests/MaxAsync.ts)
| min                | Yes     | [Sync](test/tests/Min.ts), [Async](test/tests/MinAsync.ts)
| ofType             | No      | [Sync](test/tests/OfType.ts)
| orderBy            | Yes     | [Sync](test/tests/OrderBy.ts), [Async](test/tests/OrderByAsync.ts)
| orderByDescending  | Yes     | [Sync](test/tests/OrderByDescending.ts), [Async](test/tests/OrderByDescendingAsync.ts)
| reverse            | No      | [Sync](test/tests/Reverse.ts)
| select             | Yes     | [Sync](test/tests/Select.ts), [Async](test/tests/SelectAsync.ts)
| selectMany         | Yes     | [Sync](test/tests/SelectMany.ts), [Async](test/tests/SelectManyAsync.ts)
| sequenceEquals     | Yes     | [Sync](test/tests/SequenceEquals.ts), [Async](test/tests/SequenceEqualAsync.ts)
| single             | Yes     | [Sync](test/tests/Single.ts), [Async](test/tests/SingleAsync.ts)
| singleOrDefault    | Yes     | [Sync](test/tests/SingleOrDefault.ts), [Async](test/tests/SingleOrDefaultAsync.ts)
| skip               | No      | [Sync](test/tests/Skip.ts)
| skipWhile          | Yes     | [Sync](test/tests/SkipWhile.ts), [Async](test/tests/SkipWhileAsync.ts)
| sum                | Yes     | [Sync](test/tests/Sum.ts), [Async](test/tests/SumAsync.ts)
| take               | No      | [Sync](test/tests/Take.ts)
| takeWhile          | Yes     | [Sync](test/tests/TakeWhile.ts), [Async](test/tests/TakeWhileAsync.ts)
| toArray            | No      | [Sync](test/tests/ToArray.ts)
| toMap              | Yes     | [Sync](test/tests/ToMap.ts), [Async](test/tests/ToMapAsync.ts) | Equivalent to `ToDictionary`
| toSet              | No      | [Sync](test/tests/ToSet.ts) | Equivalent to `ToHashSet`. No comparer overload for JS.
| union              | Yes     | [Sync](test/tests/Union.ts)
| where              | Yes     | [Sync](test/tests/Where.ts), [Async](test/tests/WhereAsync.ts)
| zip                | Yes     | [Sync](test/tests/Zip.ts), [Async](test/tests/ZipAsync.ts)

\* Async methods take an async function

#### Static Methods

| Method          | Async                | Parallel          | Tests Coverage |
|-----------------|----------------------|-------------------|----------------|
| empty           | emptyAsync           | emptyParallel     | [Test](test/tests/staticmethods/Empty.ts)
| enumerateObject | enumerateObjectAsync | N/A               | [Test](test/tests/staticmethods/EnumerateObject.ts)
| flatten         | flattenAsync         | flattenParallel   | [Test](test/tests/staticmethods/Flatten.ts)
| partition       | partitionAsync       | partitionParallel | [Test](test/tests/staticmethods/Partition.ts)
| range           | rangeAsync           | rangeParallel     | [Test](test/tests/staticmethods/Range.ts)
| repeat          | repeatAsync          | repeatParallel    | [Test](test/tests/staticmethods/Repeat.ts)

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

#### TypeDoc Documentation

Refer to https://arogozine.github.io/linqtotypescript/

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

### F.A.Q.

**Q**
I am getting a `Error: Cannot find module 'tslib'` error.

**A**
This library depends on tslib. Run `npm i tslib` to solve the error.

**Q**
Why did you create this?

**A**
For fun and to gain understanding of TypeScript and Node Package Manager.

**Q**
What's needed to target ES2018?

**A**
This library uses iteration and async iteration. You may need polyfills for Iterator and AsyncIterator.
Libraries such as core js have this.

**Q**
Can this run in an ES5 browser like Internet Explorer.

**A**
With the right transpiler, polyfills, and bundler. Its not recommended due to the size and most likely major performance impact.

**Q**
How does this compare to other LINQ libraries?

**A**
Other libraries tend to use eager evaluation and work with arrays instead of iterables.

**Q**
Why should I use this instead of lodash or something similar?

**A**
- TypeScript first. Libraries which target JavaScript first do additional type checking which can have a negative impact on performance.
- This library uses [iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators). Evaluation is lazy, not eager like JS array operations. These are new language features which have no support in legacy browsers like IE11.

**Q**
Which browsers are supported?

**A**
- Firefox, Chrome, and Edge. IE is **not** supported.
- A good bundler targeting ES5 should allow IE support (with proper ES6/ES7 polyfils).

**Q**
Can I contribute?

**A**
Please do!
