import { ArgumentOutOfRangeException, IEnumerable, InvalidOperationException, EqualityComparer } from "./../src/index"
import { IsTrue, IsFalse, AreEqual, IterationsAreEqual, ExpectedException } from "./UnitTest"

export class NumberTest<T extends IEnumerable<number>> {
    constructor(protected generator: (x: number[]) => T) {
        //
    }

    public aggregate() {
        const val = this.generator([1, 2, 3]).aggregate((x, y) => x + y)
        AreEqual(val, 6)

        const val2 = this.generator([1]).aggregate((x, y) => x + y)
        AreEqual(val2, 1)
    }

    @ExpectedException(InvalidOperationException)
    public aggregate_exception() {
        this.generator([]).aggregate((x, y) => x + y)
    }

    public aggregate2() {
        const val = this.generator([1, 2, 3]).aggregate(4, (x, y) => x + y)
        AreEqual(val, 10)

        const val2 = this.generator([1]).aggregate(9, (x, y) => x + y)
        AreEqual(val2, 10)

        const val3 = this.generator([]).aggregate(10, (x, y) => x + y)
        AreEqual(val3, 10)
    }

    public aggregate3() {
        const val = this.generator([1, 2, 3]).aggregate(4, (x, y) => x + y, acc => acc * 10)
        AreEqual(val, 100)
    }

    public all() {
        IsTrue(this.generator([1, 2, 3]).all(x => x !== 0))
        IsFalse(this.generator([0, 1, 2]).all(x => x > 5))
        IsTrue(this.generator([]).all(x => x === 1))
    }

    public any() {
        IsFalse(this.generator([]).any())
        IsTrue(this.generator([1]).any())
    }

    public any2() {
        IsFalse(this.generator([]).any(x => x === 0))
        IsTrue(this.generator([1]).any(x => x === 1))
        IsFalse(this.generator([1]).any(x => x === 0))
    }

    public average() {
        AreEqual(5, this.generator([0, 10]).average())
    }

    @ExpectedException(InvalidOperationException)
    public average_exception() {
        this.generator([]).average()
    }

    public average2() {
        AreEqual(50, this.generator([0, 10]).average(x => x * 10))
    }

    @ExpectedException(InvalidOperationException)
    public average2_exception() {
        this.generator([]).average(x => x * 10)
    }

    public concat() {
        const empty = this.generator([]).concat(this.generator([]))
        IterationsAreEqual(empty, [])
        const emptyLeft = this.generator([]).concat(this.generator([1]))
        IterationsAreEqual(emptyLeft, [1])
        const emptyRight = this.generator([2]).concat(this.generator([]))
        IterationsAreEqual(emptyRight, [2])
        const oneTwoThree = this.generator([1]).concat(this.generator([2, 3]))
        IterationsAreEqual(oneTwoThree, [1, 2, 3])
    }

    public contains() {
        IsFalse(this.generator([]).contains(0))
        IsFalse(this.generator([1, 2]).contains(0))
        IsTrue(this.generator([1, 2]).contains(1))
    }

    public count() {
        AreEqual(0, this.generator([]).count())
        AreEqual(1, this.generator([1]).count())
    }

    public distinct() {
        IterationsAreEqual(this.generator([]).distinct(), [])
        IterationsAreEqual(this.generator([1, 1]).distinct(), [1])
    }

    public elementAt() {
        AreEqual(this.generator([1]).elementAt(0), 1)
        AreEqual(this.generator([1, 2]).elementAt(1), 2)
    }

    @ExpectedException(ArgumentOutOfRangeException)
    public elementAt_exception() {
        this.generator([]).elementAt(0)
    }

    public elementAtOrDefault() {
        AreEqual(this.generator([1]).elementAtOrDefault(0), 1)
        AreEqual(this.generator([1, 2]).elementAtOrDefault(1), 2)

        IsTrue(null === this.generator([]).elementAtOrDefault(0))
    }

    public except() {
        IterationsAreEqual(
            this.generator([1, 2, 3]).except(this.generator([1, 2])),
            [3])
    }

    public first() {
        AreEqual(this.generator([1]).first(), 1)
    }

    @ExpectedException(InvalidOperationException)
    public first_exception() {
        this.generator([]).first()
    }

    public first2() {
        AreEqual(this.generator([1, 2, 3]).first(x => x === 2), 2)
    }

    @ExpectedException(InvalidOperationException)
    public first2_exception() {
        this.generator([1, 2, 3]).first(x => x === 4)
    }

    public orderBy() {
        const vals = this.generator([1, 2, 3, 4, 5, 6, 7, 8, 9])
        IterationsAreEqual(vals.orderBy(x => x), vals)

        // TODO: Behavior Difference Between C# and JS
        // IterationsAreEqual(vals.orderBy(x => -x), vals.reverse())
    }

    public max() {
        AreEqual(this.generator([1, 2, 3]).max(), 3)
    }

    @ExpectedException(InvalidOperationException)
    public max_exception() {
        this.generator([]).max()
    }

    public max2() {
        AreEqual(this.generator([1, 2, 3]).max(x => x * 2), 6)
    }

    @ExpectedException(InvalidOperationException)
    public max2_exception() {
        this.generator([]).max(x => x * 2)
    }

    public orderByDescending() {
        const vals = this.generator([1, 2, 3, 4, 5, 6, 7, 8, 9])
        IterationsAreEqual(vals.orderByDescending(x => x), vals.reverse())
    }

    public reverse() {
        const vals = this.generator([1, 2, 3])
        IterationsAreEqual(vals.reverse(), [3, 2, 1])

        IterationsAreEqual([].reverse(), [])
    }

    public skip() {
        const vals = this.generator([1, 2, 3, 4])
        IterationsAreEqual(vals.skip(1), [2, 3, 4])
        IterationsAreEqual(vals.skip(0), vals)

        IterationsAreEqual(vals.skip(-9), vals)
    }

    public take() {
        const vals = this.generator([1, 2, 3, 4])
        IterationsAreEqual(vals.take(4), vals)
        IterationsAreEqual(vals.take(1), [1])
        IterationsAreEqual(vals.take(2), [1, 2])

        IterationsAreEqual(vals.take(0), [])
        IterationsAreEqual(vals.take(-1), [])
    }

    public takeWhile() {
        const vals = this.generator([1, 2, 3, 4])
        IterationsAreEqual(vals.takeWhile(x => true), vals)
        IterationsAreEqual(vals.takeWhile(x => false), [])
        IterationsAreEqual(vals.takeWhile(x => x !== 3), [1, 2])

        IterationsAreEqual(vals.takeWhile((x: number, i: number) => true), vals)
        IterationsAreEqual(vals.takeWhile((x: number, i: number) => false), [])
        IterationsAreEqual(vals.takeWhile((x: number, i: number) => x !== 3), [1, 2])
    }

    public union() {
        const ints1 = this.generator([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2 = this.generator([ 8, 3, 6, 4, 4, 9, 1, 0 ])

        const union = ints1.union(ints2)

        IterationsAreEqual([5, 3, 9, 7, 8, 6, 4, 1, 0], union)
    }

    public union2() {
        const ints1: IEnumerable<string|number> = this.generator([ 5, 3, 9, 7, 5, 9, 3, 7 ])
        const ints2: IEnumerable<string|number> = [ "8", "3", "6", "4", "4", "9", "1", "0" ]

        const union = ints1.union(ints2, EqualityComparer)

        IterationsAreEqual([5, 3, 9, 7, "8", "6", "4", "1", "0"], union)
    }

    public where() {
        const vals = this.generator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        IterationsAreEqual(vals.where(x => x > 8), [9])
    }

    public where2() {
        const vals = this.generator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        IterationsAreEqual(vals.where((x: number, i: number) => i === 9), [9])
    }
}
