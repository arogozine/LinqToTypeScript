"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Linq = require("./../src/index");
const UnitTest_1 = require("./UnitTest");
Linq.initialize();
let LinqTests = class LinqTests {
    aggregate() {
        UnitTest_1.AreEqual([1, 2].aggregate((x, y) => x + y), 3);
        UnitTest_1.AreEqual(["f", "o", "o"].aggregate((x, y) => x + y), "foo");
        const sentence = "the quick brown fox jumps over the lazy dog";
        const words = sentence.split(" ");
        const reversed = words.aggregate((workingSentence, next) => next + " " + workingSentence);
        UnitTest_1.AreEqual(reversed, "dog lazy the over jumps fox brown quick the");
    }
    aggregateWithAccumulate() {
        UnitTest_1.AreEqual([1, 2, 3].aggregate(4, (acc, x) => acc + x), 10);
        const ints = [4, 8, 8, 3, 9, 0, 7, 8, 2];
        const numEven = ints.aggregate(0, (total, next) => next % 2 === 0 ? total + 1 : total);
        UnitTest_1.AreEqual(numEven, 6);
    }
    static aggregateWithResultSelector() {
        UnitTest_1.AreEqual([1, 2, 3].aggregate("seed", (acc, y) => acc + y, acc => acc + "result"), "seed123result");
        const fruits = ["apple", "mango", "orange", "passionfruit", "grape"];
        const longestName = fruits.aggregate("banana", (longest, next) => next.length > longest.length ? next : longest, fruit => fruit.toUpperCase());
        UnitTest_1.AreEqual(longestName, "PASSIONFRUIT");
    }
    all() {
        UnitTest_1.IsTrue([1, 2].all(x => x < 3));
        UnitTest_1.IsFalse([1, 2].all(x => x < 2));
        const pets = [
            { Age: 10, Name: "Barley" },
            { Age: 4, Name: "Boots" },
            { Age: 6, Name: "Whiskers" }];
        const allStartWithB = pets.all(pet => pet.Name.startsWith("B"));
        UnitTest_1.IsFalse(allStartWithB);
    }
    allMap() {
        const map = new Map();
        map.set("foo", "bar");
        map.set("foo2", "bar");
        const allAreBar = map.all(x => x[1] === "bar");
        UnitTest_1.IsTrue(allAreBar);
    }
    any() {
        UnitTest_1.IsTrue([0].any());
        UnitTest_1.IsTrue([true].any());
        UnitTest_1.IsTrue([true].any(x => x));
        UnitTest_1.IsFalse([].any());
        UnitTest_1.IsFalse([].any(x => x));
        UnitTest_1.IsFalse([true].any(x => !x));
    }
    anyMap() {
        UnitTest_1.IsFalse(new Map().any());
    }
    count() {
        UnitTest_1.AreEqual([1, 2, 3].count(), 3);
    }
    countPredicate() {
        UnitTest_1.AreEqual([true, true, false].count(x => x), 2);
    }
    concat() {
        UnitTest_1.IterationsAreEqual([1, 2].concat([2, 3]), [1, 2, 2, 3]);
    }
    contains() {
        UnitTest_1.IsTrue([1, 2, 3].contains(1));
        UnitTest_1.IsFalse([1, 2, 3].contains(4));
    }
    containsWithComparer() {
        UnitTest_1.IsFalse([1, "2", "3"].contains(2));
        UnitTest_1.IsTrue([1, "2", "3"].contains(2, Linq.EqualityComparer));
    }
    distinct() {
        UnitTest_1.IterationsAreEqual([1, 1, 2].distinct(), [1, 2]);
        UnitTest_1.IterationsAreEqual(["f", "o", "o"].distinct(), ["f", "o"]);
    }
    distinctWeakEqualityComparer() {
        UnitTest_1.IterationsAreEqual(["1", 1, 2, 2, 3, "3"].distinct(Linq.EqualityComparer), ["1", 2, 3]);
    }
    enumerateObject() {
        const object = {
            "a": 1,
            "b": "foo",
            "z": [1, 2, false],
        };
        for (let item of Linq.Enumerable.enumerateObject(object)) {
            UnitTest_1.AreEqual(object[item.first], item.second);
        }
    }
    each() {
        let y = 0;
        [1, 2].each(x => y += x);
        UnitTest_1.AreEqual(y, 3);
    }
    elementAt() {
        UnitTest_1.AreEqual([1, 2].elementAt(1), 2);
    }
    elementAtError() {
        [1, 2].elementAt(3);
    }
    elementAtOrDefault() {
        UnitTest_1.AreEqual([1, 2].elementAtOrDefault(0), 1);
        UnitTest_1.AreEqual([1, 2].elementAtOrDefault(3), null);
    }
    except() {
        UnitTest_1.IterationsAreEqual([1, 2].except([1]), [2]);
    }
    exceptAtWithEqualityComparer() {
        UnitTest_1.IterationsAreEqual([1, 2].except(["1"], Linq.EqualityComparer), [2]);
    }
    first() {
        UnitTest_1.AreEqual([1, 2].first(), 1);
    }
    firstError() {
        [].first();
    }
    firstPredicate() {
        UnitTest_1.AreEqual([1, 2].first(x => x === 2), 2);
    }
    firstOrDefault() {
        UnitTest_1.AreEqual([].firstOrDefault(), null);
    }
    flatten() {
        UnitTest_1.IterationsAreEqual(Linq.Enumerable.flatten([1, 2, 3]), [1, 2, 3]);
        UnitTest_1.IterationsAreEqual(Linq.Enumerable.flatten([1, [2], "3"]), [1, 2, "3"]);
        UnitTest_1.IterationsAreEqual(Linq.Enumerable.flatten([1, [2, 3]]), [1, 2, 3]);
        const shallow = Linq.Enumerable.flatten([1, [2, [3]]], true).toArray();
        UnitTest_1.AreEqual(shallow.length, 3);
        UnitTest_1.AreEqual(shallow[0], 1);
        UnitTest_1.AreEqual(shallow[1], 2);
        UnitTest_1.IsTrue(shallow[2] instanceof Array);
        UnitTest_1.AreEqual(shallow[2].length, 1);
        UnitTest_1.AreEqual(shallow[2][0], 3);
    }
    groupBy() {
        const grouping = [1, 2, 2, 3, 3].groupBy(x => x).toArray();
        UnitTest_1.IterationsAreEqual(grouping[0], [1]);
        UnitTest_1.IterationsAreEqual(grouping[1], [2, 2]);
        UnitTest_1.IterationsAreEqual(grouping[2], [3, 3]);
    }
    intersect() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].intersect([1, 2]), [1, 2]);
    }
    intersectWithEqualityComparer() {
        UnitTest_1.IterationsAreEqual([1, 2, "3"].intersect(["1", "2"], Linq.EqualityComparer), [1, 2]);
    }
    take() {
        UnitTest_1.IterationsAreEqual([1, 2, 3, 4, 5].take(2), [1, 2]);
    }
    static last() {
        UnitTest_1.AreEqual([1, 2].last(), 2);
    }
    lastError() {
        [].last();
    }
    static lastPredicate() {
        UnitTest_1.AreEqual([1, 2].last(x => x === 1), 1);
    }
    static lastOrDefault() {
        UnitTest_1.AreEqual([].lastOrDefault(), null);
    }
    lastOrDefaultPredicate() {
        UnitTest_1.AreEqual([1, 2, 3].lastOrDefault(x => x === 4), null);
    }
    max() {
        UnitTest_1.AreEqual([1, 2, 3].max(), 3);
    }
    maxPredicate() {
        UnitTest_1.AreEqual([1, 2, 3].max(x => x * x), 9);
    }
    min() {
        UnitTest_1.AreEqual([1, 2, 3, -7].min(), -7);
    }
    minPredicate() {
        UnitTest_1.AreEqual([1, 2, 3, -7].min(Math.abs), 1);
    }
    ofTypeString() {
        const strings = ["str", "str2", 1, 2, 3, {}].ofType("string");
        UnitTest_1.IterationsAreEqual(strings, ["str", "str2"]);
    }
    ofTypeNumber() {
        const num = [1, 2, 3].ofType("number");
        UnitTest_1.IterationsAreEqual(num, [1, 2, 3]);
    }
    ofTypeBoolean() {
        const booleans = [1, 2, "4", false, true].ofType("boolean");
        UnitTest_1.IterationsAreEqual(booleans, [false, true]);
    }
    ofTypeObject() {
        const object = {};
        const objects = [1, 2, "3", false, object].ofType("object");
        UnitTest_1.IterationsAreEqual(objects, [object]);
    }
    ofTypeNumberObject() {
        const num = new Number(1);
        const numbers = [1, 2, "3", false, num].ofType(Number);
        UnitTest_1.IsTrue(numbers.toArray().length === 1);
        UnitTest_1.IterationsAreEqual(numbers, [num]);
    }
    orderByNumber() {
        const vals = [3, 4, 7, 0, 1].orderBy(x => x);
        UnitTest_1.IterationsAreEqual(vals, [0, 1, 3, 4, 7]);
    }
    orderByString() {
        const vals = ["b", "c", "a"].orderBy(x => x);
        UnitTest_1.IterationsAreEqual(vals, ["a", "b", "c"]);
    }
    reverse() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].reverse(), [3, 2, 1]);
    }
    select() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].select(x => x * 10), [10, 20, 30]);
    }
    selectMany() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].selectMany(x => [x, x * x]), [1, 1, 2, 4, 3, 9]);
    }
    sum() {
        const numbers = [43.68, 1.25, 583.7, 6.5];
        UnitTest_1.AreEqual(635.13, numbers.sum());
    }
    toMap() {
        const map = [1, 2, 3].toMap(x => x.toString());
        UnitTest_1.IsTrue(map instanceof Map);
        function check(x, y) {
            const value = map.get(x);
            UnitTest_1.IsFalse(typeof value === undefined);
            UnitTest_1.AreEqual(value.length, 1);
            UnitTest_1.AreEqual(value[0], y);
        }
        check("1", 1);
        check("2", 2);
        check("3", 3);
    }
    toSet() {
        UnitTest_1.IsTrue([1, 2, 3].toSet() instanceof Set);
    }
    skip() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].skip(2), [3]);
    }
    union() {
        UnitTest_1.IterationsAreEqual([1, 2, 3].union([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
        UnitTest_1.IterationsAreEqual([1, 2, 2].union([2, 2, 3]), [1, 2, 3]);
    }
    unionWithEqualityComparer() {
        const values = [1, 2, 3].union(["1", "2", "3"], Linq.EqualityComparer);
        UnitTest_1.IterationsAreEqual(values, [1, 2, 3]);
        const values2 = [1, 2, 3].union(["1", "2", "3", "4"], Linq.EqualityComparer);
        UnitTest_1.IterationsAreEqual(values2, [1, 2, 3, "4"]);
    }
    zip() {
        const it1 = [1, 2, 3, 4];
        const it2 = ["5", "6", "7", "8"];
        const zip = it1.zip(it2).toArray();
        UnitTest_1.AreEqual(zip.length, it1.length);
        for (let i = 0; i < zip.length; i++) {
            const val = zip[i];
            const first = it1[i];
            const second = it2[i];
            UnitTest_1.AreEqual(val.first, first);
            UnitTest_1.AreEqual(val.second, second);
        }
    }
    zipWithResultSelector() {
        const it1 = [1, 2, 3, 4];
        const it2 = ["5", "6", "7", "8"];
        const zip = it1.zip(it2, (a, b) => { return { a, b }; }).toArray();
        for (let i = 0; i < zip.length; i++) {
            const val = zip[i];
            const first = it1[i];
            const second = it2[i];
            UnitTest_1.AreEqual(val.a, first);
            UnitTest_1.AreEqual(val.b, second);
        }
    }
};
__decorate([
    UnitTest_1.ExpectedException(Linq.ArgumentOutOfRangeException)
], LinqTests.prototype, "elementAtError", null);
__decorate([
    UnitTest_1.ExpectedException(Linq.InvalidOperationException)
], LinqTests.prototype, "firstError", null);
__decorate([
    UnitTest_1.ExpectedException(Linq.InvalidOperationException)
], LinqTests.prototype, "lastError", null);
LinqTests = __decorate([
    UnitTest_1.TestClass
], LinqTests);
UnitTest_1.RunTests();
process.exit();
