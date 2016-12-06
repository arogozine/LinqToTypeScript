import * as Linq from "./../src/index"
import { TestClass, RunTests, IsTrue, IsFalse, AreEqual, IterationsAreEqual, ExpectedException } from "./UnitTest"

Linq.initialize()

@TestClass
class LinqTests {

    public aggregate() {
        AreEqual([1, 2].aggregate((x, y) => x + y), 3)
        AreEqual(["f", "o", "o"].aggregate((x, y) => x + y), "foo")


        const sentence = "the quick brown fox jumps over the lazy dog"
        // Split the string into individual words.
        const words = sentence.split(" ")
        // Prepend each word to the beginning of the 
        // new sentence to reverse the word order.
        const reversed = words.aggregate((workingSentence, next) =>
                                      next + " " + workingSentence)

        AreEqual(reversed, "dog lazy the over jumps fox brown quick the")
    }

    public aggregateWithAccumulate() {
        AreEqual([1, 2, 3].aggregate(4, (acc, x) => acc + x), 10)

        const ints = [ 4, 8, 8, 3, 9, 0, 7, 8, 2 ]

        // Count the even numbers in the array, using a seed value of 0.
        const numEven = ints.aggregate(0, (total, next) =>
                                    next % 2 === 0 ? total + 1 : total)
        AreEqual(numEven, 6)
    }

    public static aggregateWithResultSelector() {
        AreEqual([1, 2, 3].aggregate("seed", (acc, y) => acc + y, acc => acc + "result"), "seed123result")

        const fruits = [ "apple", "mango", "orange", "passionfruit", "grape" ]

        // Determine whether any string in the array is longer than "banana".
        const longestName =
            fruits.aggregate("banana",
                            (longest, next) =>
                                next.length > longest.length ? next : longest,
                    // Return the final result as an upper case string.
                    fruit => fruit.toUpperCase())

        AreEqual(longestName, "PASSIONFRUIT")
    }

    public all() {
        IsTrue([1, 2].all(x => x < 3))
        IsFalse([1, 2].all(x => x < 2))


        // Create an array of Pets.
        const pets = [
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ]

        // Determine whether all pet names 
        // in the array start with 'B'.
        const allStartWithB = pets.all(pet =>
                                        pet.Name.startsWith("B"))

        IsFalse(allStartWithB)
    }

    public allMap() {
        const map = new Map<string, string>()
        map.set("foo", "bar")
        map.set("foo2", "bar")

        const allAreBar = map.all(x => x[1] === "bar")
        IsTrue(allAreBar)
    }

    public any() {
        IsTrue([0].any())
        IsTrue([true].any())
        IsTrue([true].any(x => x))

        IsFalse([].any())
        IsFalse([].any(x => x))
        IsFalse([true].any(x => !x))
    }

    public anyMap() {
        IsFalse(new Map<any, any>().any())
    }

    public count() {
        AreEqual([1, 2, 3].count(), 3)
    }

    public countPredicate() {
        AreEqual([true, true, false].count(x => x), 2)
    }

    public concat() {
        IterationsAreEqual([1, 2].concat([2, 3]), [1, 2, 2, 3])
    }

    public contains() {
        IsTrue([1, 2, 3].contains(1))
        IsFalse([1, 2, 3].contains(4))
    }

    public containsWithComparer() {
        // false with strong comparer (===)
        IsFalse([1, "2", "3"].contains(2))
        IsTrue([1, "2", "3"].contains(2, Linq.EqualityComparer))
    }

    public distinct() {
        IterationsAreEqual([1, 1, 2].distinct(), [1, 2])
        IterationsAreEqual(["f", "o", "o"].distinct(), ["f", "o"])
    }

    public distinctWeakEqualityComparer() {
        IterationsAreEqual(["1", 1, 2, 2, 3, "3"].distinct(Linq.EqualityComparer), ["1", 2, 3])
    }

    public enumerateObject() {
        const object = {
            "a": 1,
            "b": "foo",
            "z": [1, 2, false],
        }

        for (let item of Linq.Enumerable.enumerateObject(object)) {
            AreEqual((object as any)[item.first], item.second)
        }
    }

    public each() {
        let y = 0;
        [1, 2].each(x => y += x)
        AreEqual(y, 3)
    }

    public elementAt() {
        AreEqual([1, 2].elementAt(1), 2)
    }

    @ExpectedException(Linq.ArgumentOutOfRangeException)
    public elementAtError() {
        [1, 2].elementAt(3)
    }

    public elementAtOrDefault() {
        AreEqual([1, 2].elementAtOrDefault(0), 1)
        AreEqual([1, 2].elementAtOrDefault(3), null)
    }

    public except() {
        IterationsAreEqual([1, 2].except([1]), [2])
    }

    public exceptAtWithEqualityComparer() {
        IterationsAreEqual(([1, 2] as Linq.IEnumerable<string | number>).except(["1"], Linq.EqualityComparer), [2])
    }

    public first() {
        AreEqual([1, 2].first(), 1)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public firstError() {
        [].first()
    }

    public firstPredicate() {
        AreEqual([1, 2].first(x => x === 2), 2)
    }

    public firstOrDefault() {
        AreEqual([].firstOrDefault(), null)
    }

    public flatten() {
        IterationsAreEqual(Linq.Enumerable.flatten([1, 2, 3]), [1, 2, 3])
        IterationsAreEqual(Linq.Enumerable.flatten<string | number>([1, [2], "3"]), [1, 2, "3"])
        IterationsAreEqual(Linq.Enumerable.flatten([1, [2, 3]]), [1, 2, 3])

        const shallow = Linq.Enumerable.flatten([1, [2, [3]]], true).toArray()
        AreEqual(shallow.length, 3)
        AreEqual(shallow[0], 1)
        AreEqual(shallow[1], 2)
        IsTrue(shallow[2] instanceof Array)
        AreEqual((shallow[2] as number[]).length, 1)
        AreEqual((shallow[2] as number[])[0], 3)
    }

    public groupBy() {
        const grouping = [1, 2, 2, 3, 3].groupBy(x => x).toArray()
        IterationsAreEqual(grouping[0], [1])
        IterationsAreEqual(grouping[1], [2, 2])
        IterationsAreEqual(grouping[2], [3, 3])
    }

    public intersect() {
        IterationsAreEqual([1, 2, 3].intersect([1, 2]), [1, 2])
    }

    public intersectWithEqualityComparer() {
        IterationsAreEqual([1, 2, "3"].intersect(["1", "2"], Linq.EqualityComparer), [1, 2])
    }

    public take() {
        IterationsAreEqual([1, 2, 3, 4, 5].take(2), [1, 2])
    }

    public static last() {
        AreEqual([1, 2].last(), 2)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public lastError() {
        [].last()
    }

    public static lastPredicate() {
        AreEqual([1, 2].last(x => x === 1), 1)
    }

    public static lastOrDefault() {
        AreEqual([].lastOrDefault(), null)
    }

    public lastOrDefaultPredicate() {
        AreEqual([1, 2, 3].lastOrDefault(x => x === 4), null)
    }

    public max() {
        AreEqual([1, 2, 3].max(), 3)
    }

    public maxPredicate() {
        AreEqual([1, 2, 3].max(x => x * x), 9)
    }

    public min() {
        AreEqual([1, 2, 3, -7].min(), -7)
    }

    public minPredicate() {
        AreEqual([1, 2, 3, -7].min(Math.abs), 1)
    }

    public ofTypeString() {
        const strings = ["str", "str2", 1, 2, 3, {}].ofType("string")
        IterationsAreEqual(strings, ["str", "str2"])
    }

    public ofTypeNumber() {
        const num = [1, 2, 3].ofType("number")
        IterationsAreEqual(num, [1, 2, 3])
    }

    public ofTypeBoolean() {
        const booleans = [1, 2, "4", false, true].ofType("boolean")
        IterationsAreEqual(booleans, [false, true])
    }

    public ofTypeObject() {
        const object = {}
        const objects = [1, 2, "3", false, object].ofType("object")
        IterationsAreEqual(objects, [ object ])
    }

    public ofTypeNumberObject() {
        const num = new Number(1)
        const numbers = [1, 2, "3", false, num].ofType(Number)
        IsTrue(numbers.toArray().length === 1)
        IterationsAreEqual(numbers, [ num ])
    }

    public orderByNumber() {
        const vals = [3, 4, 7, 0, 1].orderBy(x => x)
        IterationsAreEqual(vals, [0, 1, 3, 4, 7])
    }

    public orderByString() {
        const vals = ["b", "c", "a"].orderBy(x => x)
        IterationsAreEqual(vals, ["a", "b", "c"])
    }

    public reverse() {
        IterationsAreEqual([1, 2, 3].reverse(), [3, 2, 1])
    }

    public select() {
        IterationsAreEqual([1, 2, 3].select(x => x * 10), [10, 20, 30])
    }

    public selectMany() {
        IterationsAreEqual([1, 2, 3].selectMany(x => [x, x * x]), [1, 1, 2, 4, 3, 9])
    }

    public sum() {
         const numbers = [ 43.68, 1.25, 583.7, 6.5 ]
         AreEqual(635.13, numbers.sum())
    }

    public toMap() {
        const map = [1, 2, 3].toMap(x => x.toString())
        IsTrue(map instanceof Map)
        function check(x: string, y: number) {
            const value = map.get(x)
            IsFalse(typeof value === undefined)

            AreEqual((value as Number[]).length, 1)
            AreEqual((value as Number[])[0], y)
        }

        check("1", 1)
        check("2", 2)
        check("3", 3)
    }

    public toSet() {
        IsTrue([1, 2, 3].toSet() instanceof Set)
    }

    public skip() {
        IterationsAreEqual([1, 2, 3].skip(2), [3])
    }

    public union() {
        IterationsAreEqual([1, 2, 3].union([4, 5, 6]), [1, 2, 3, 4, 5, 6])
        IterationsAreEqual([1, 2, 2].union([2, 2, 3]), [1, 2, 3])
    }

    public unionWithEqualityComparer() {
        const values = ([1, 2, 3] as (number|string)[]).union(["1", "2", "3"], Linq.EqualityComparer)
        IterationsAreEqual(values, [1, 2, 3])

        const values2 = ([1, 2, 3] as (number|string)[]).union(["1", "2", "3", "4"], Linq.EqualityComparer)
        IterationsAreEqual(values2, [1, 2, 3, "4"])
    }

    // TODO: union

    public zip() {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = it1.zip(it2).toArray()

        AreEqual(zip.length, it1.length)

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]

            AreEqual(val.first, first)
            AreEqual(val.second, second)
        }
    }

    public zipWithResultSelector() {
        const it1 = [1, 2, 3, 4]
        const it2 = ["5", "6", "7", "8"]

        const zip = it1.zip(it2, (a, b) => { return { a, b } }).toArray()

        for (let i = 0; i < zip.length; i++) {
            const val = zip[i]
            const first = it1[i]
            const second = it2[i]
            AreEqual(val.a, first)
            AreEqual(val.b, second)
        }
    }
}

RunTests()

declare var process: any
process.exit()
