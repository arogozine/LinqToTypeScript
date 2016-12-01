# Linq To TypeScript
Linq to TypeScript

- Implementation of LINQ for TypeScript
- Targets TypeScript 2.0 and ES6

### Getting Started

```TypeScript
// Import Module
import * as Linq from "Linq"
// Bind Linq Functions to Array and Map
Linq.initialize()
```

### API

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

// SEQUENCEEQUALS
// SINGLE
// SINGLEORDEFAULT
// SUM
// SKIP
[1, 2, 3].skip(2) // [3]

// SKIPWHILE

// TOARRAY
// TOMAP
// TOSET
// UNION
[1, 2, 3].union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]
// WHERE
// ZIP
```
