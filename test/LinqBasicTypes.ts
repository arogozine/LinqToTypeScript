import * as Linq from "./../src/index"
import { IsTrue, IsFalse, AreEqual, IterationsAreEqual, ExpectedException } from "./UnitTest"

export abstract class LinqTests {

    constructor(public generator: (x: any[]) => Linq.IEnumerable<any>) {
        //
    }

    public aggregate() {
        AreEqual(this.generator(["f", "o", "o"]).aggregate((x, y) => x + y), "foo")

        const sentence = "the quick brown fox jumps over the lazy dog"
        // Split the string into individual words.
        const words = sentence.split(" ")
        // Prepend each word to the beginning of the 
        // new sentence to reverse the word order.
        const reversed = words.aggregate((workingSentence, next) =>
                                      next + " " + workingSentence)

        AreEqual(reversed, "dog lazy the over jumps fox brown quick the")
    }

    public aggregateWithResultSelector() {

        const fruits = this.generator([ "apple", "mango", "orange", "passionfruit", "grape" ])

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
        // Create an array of Pets.
        const pets = this.generator([
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" } ])

        // Determine whether all pet names 
        // in the array start with 'B'.
        const allStartWithB = pets.all(pet =>
                                        pet.Name.startsWith("B"))

        IsFalse(allStartWithB)
    }

    public any() {
        IsTrue(this.generator([0]).any())
        IsTrue(this.generator([true]).any())
        IsTrue(this.generator([true]).any(x => x))

        IsFalse(this.generator([]).any())
        IsFalse(this.generator([]).any(x => x))
        IsFalse(this.generator([true]).any(x => !x))
    }

    public countPredicate() {
        AreEqual(this.generator([true, true, false]).count(x => x), 2)
    }

    public containsWithComparer() {
        // false with strong comparer (===)
        IsFalse(this.generator([1, "2", "3"]).contains(2))
        IsTrue(this.generator([1, "2", "3"]).contains(2, Linq.EqualityComparer))
    }

    public distinct() {
        IterationsAreEqual(this.generator(["f", "o", "o"]).distinct(), ["f", "o"])
    }

    public distinctWeakEqualityComparer() {
        IterationsAreEqual(this.generator(["1", 1, 2, 2, 3, "3"]).distinct(Linq.EqualityComparer), ["1", 2, 3])
    }

    public enumerateObject() {
        const object = {
            "a": 1,
            "b": "foo",
            "z": [1, 2, false],
        }

        for (let item of Linq.Enumerable.enumerateObject(object)) {
            AreEqual(item.second, object[item.first])
        }
    }

    @ExpectedException(Linq.InvalidOperationException)
    public firstError() {
        this.generator([]).first()
    }

    public firstPredicate() {
        AreEqual(this.generator([1, 2]).first(x => x === 2), 2)
    }

    public firstOrDefault() {
        AreEqual(this.generator([]).firstOrDefault(), null)
    }

    public flatten() {
        IterationsAreEqual(Linq.Enumerable.flatten(this.generator([1, 2, 3])), [1, 2, 3])
        IterationsAreEqual(Linq.Enumerable.flatten<string | number>(this.generator([1, [2], "3"])), [1, 2, "3"])
        IterationsAreEqual(Linq.Enumerable.flatten(this.generator([1, [2, 3]])), [1, 2, 3])

        const shallow = Linq.Enumerable.flatten(this.generator([1, [2, [3]]]), true).toArray()
        AreEqual(shallow.length, 3)
        AreEqual(shallow[0], 1)
        AreEqual(shallow[1], 2)
        IsTrue(shallow[2] instanceof Array)
        AreEqual((shallow[2] as number[]).length, 1)
        AreEqual((shallow[2] as number[])[0], 3)
    }

    public intersectWithEqualityComparer() {
        IterationsAreEqual(this.generator([1, 2, "3"])
            .intersect(this.generator(["1", "2"]), Linq.EqualityComparer), [1, 2])
    }

    public take() {
        IterationsAreEqual(this.generator([1, 2, 3, 4, 5]).take(2), [1, 2])
    }

    public last() {
        AreEqual(this.generator([1, 2]).last(), 2)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public lastError() {
        this.generator([]).last()
    }

    public lastPredicate() {
        AreEqual(this.generator([1, 2]).last(x => x === 1), 1)
    }

    public lastOrDefault() {
        AreEqual(this.generator([]).lastOrDefault(), null)
    }

    public lastOrDefaultPredicate() {
        AreEqual(this.generator([1, 2, 3]).lastOrDefault(x => x === 4), null)
    }

    public max() {
        AreEqual(this.generator([1, 2, 3]).max(), 3)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public maxError() {
        this.generator([]).max()
    }

    @ExpectedException(Linq.InvalidOperationException)
    public maxError2() {
        (this.generator([] as number[])).max(x => x * x)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public maxError3() {
        this.generator([]).select(x => x).max()
    }

    @ExpectedException(Linq.InvalidOperationException)
    public maxError4() {
        this.generator(([] as number[])).select(x => x).max(x => x * x)
    }

    public maxPredicate() {
        AreEqual(this.generator([1, 2, 3]).max(x => x * x), 9)
    }

    public min() {
        AreEqual(this.generator([1, 2, 3, -7]).min(), -7)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public minError() {
        this.generator([]).min()
    }

    @ExpectedException(Linq.InvalidOperationException)
    public minError2() {
        this.generator([] as number[]).min(x => x * x)
    }

    @ExpectedException(Linq.InvalidOperationException)
    public minError3() {
        this.generator([]).select(x => x).min()
    }

    @ExpectedException(Linq.InvalidOperationException)
    public minError4() {
        this.generator([] as number[]).select(x => x).min(x => x * x)
    }

    public minPredicate() {
        AreEqual(this.generator([1, 2, 3, -7]).min(Math.abs), 1)
    }

    public ofTypeString() {
        IterationsAreEqual(this.generator(["str", "str2", 1, 2, 3, {}]).ofType("string"), ["str", "str2"])
    }

    public ofTypeNumber() {
        IterationsAreEqual(this.generator([1, 2, 3]).ofType("number"), [1, 2, 3])
    }

    public ofTypeBoolean() {
        const booleans = this.generator([1, 2, "4", false, true]).ofType("boolean")
        IterationsAreEqual(booleans, [false, true])
    }

    public ofTypeObject() {
        const object = {}
        const objects = this.generator([1, 2, "3", false, object]).ofType("object")
        IterationsAreEqual(objects, [ object ])
    }

    public ofTypeNumberObject() {
        /* tslint:disable */
        const num = new Number(1)
        /* tslint:enable */
        const numbers = this.generator([1, 2, "3", false, num]).ofType(Number)
        IsTrue(numbers.toArray().length === 1)
        IterationsAreEqual(numbers, [ num ])
    }

    public orderByString() {
        const vals = this.generator(["b", "c", "a"]).orderBy(x => x)
        IterationsAreEqual(vals, ["a", "b", "c"])
    }

    public select() {
        IterationsAreEqual(this.generator(["1", "2", "3"]).select(Number.parseInt), [1, 2, 3])
        IterationsAreEqual(this.generator(["1", "22", "333"]).select("length"), [1, 2, 3])
    }

    public selectMany() {
        const values = this.generator([
            { a: [1, 2]},
            { a: [3, 4]},
        ])

        IterationsAreEqual(values.selectMany(x => x.a), [1, 2, 3, 4])
    }

    public sum() {
         const numbers = this.generator([ 43.68, 1.25, 583.7, 6.5 ])
         AreEqual(635.13, numbers.sum())
    }

    public sumWithSelector() {
        const zooms = this.generator([ { a: 1}, { a: 2 }, {a: 3} ])
        AreEqual(6, zooms.sum(x => x.a))
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
