# Linq To TypeScript
Linq to TypeScript

- Implementation of LINQ for TypeScript
- Targets TypeScript 2.0 and ES6

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

// COUNT
[1, 2, 3].count() // 3
[true, true, false].count(x => x) // false

// CONTAINS
[1, 2, 3].contains(1) // true
[1, "2", "3"].contains(2, Linq.EqualityComparer) // true

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

// FIRST
[1, 2].first() // 1
[1, 2].first(x => x === 2) // 2

// FIRSTORDEFAULT
[].firstOrDefault() // null

// FLATTEN
Linq.Enumerable.flatten([1, [2, 3]]) // [1, 2, 3]

// INTERSECT
[1, 2, 3].intersect([1, 2]) // [1, 2]

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

// TOMAP
// TOSET
// UNION
[1, 2, 3].union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]
// ZIP
```
