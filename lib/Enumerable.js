"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("./TypesAndHelpers");
class ArrayEnumerable extends Array {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return super.every(predicate);
    }
    any(predicate) {
        return this.some(predicate || (() => true));
    }
    average(selector) {
        return Enumerable.average(this, selector);
    }
    concat() {
        let items;
        if (arguments.length === 1) {
            items = arguments[0];
        }
        else {
            items = [...arguments];
        }
        if (items instanceof BasicEnumerable) {
            const enumerable = this;
            function* iterator() {
                for (const x of enumerable) {
                    yield x;
                }
                for (const x of items) {
                    yield x;
                }
            }
            return new BasicEnumerable(iterator);
        }
        else {
            return super.concat.apply(this, [items]);
        }
    }
    contains(value, comparer) {
        return Enumerable.contains(this, value, comparer);
    }
    count(predicate) {
        if (predicate) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (predicate(this[i]) === true) {
                    count++;
                }
            }
            return count;
        }
        else {
            return this.length;
        }
    }
    distinct(comparer) {
        return Enumerable.distinct(this, comparer);
    }
    elementAt(index) {
        if (index >= this.length) {
            throw new TypesAndHelpers_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    }
    elementAtOrDefault(index) {
        return Enumerable.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable.except(this, second, comparer);
    }
    first(predicate) {
        if (predicate) {
            const value = this.find(predicate);
            if (value === undefined) {
                throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
            }
            else {
                return value;
            }
        }
        else {
            if (this.length === 0) {
                throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
            }
            return this[0];
        }
    }
    firstOrDefault(predicate) {
        if (predicate) {
            const value = this.find(predicate);
            if (value === undefined) {
                return null;
            }
            else {
                return value;
            }
        }
        else {
            return this.length === 0 ? null : this[0];
        }
    }
    each(action) {
        return Enumerable.each(this, action);
    }
    groupBy(keySelector, comparer) {
        return Enumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return Enumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate(value) === true) {
                    return value;
                }
            }
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
        }
        else {
            if (this.length === 0) {
                throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
            }
            return this[this.length - 1];
        }
    }
    lastOrDefault(predicate) {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate(value) === true) {
                    return value;
                }
            }
            return null;
        }
        else {
            return this.length === 0 ? null : this[this.length - 1];
        }
    }
    max(selector) {
        if (this.length === 0) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        if (selector) {
            let max = Number.MIN_VALUE;
            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max);
            }
            return max;
        }
        else {
            return Math.max.apply(null, this);
        }
    }
    min(selector) {
        if (this.length === 0) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        if (selector) {
            let min = Number.MAX_VALUE;
            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min);
            }
            return min;
        }
        else {
            return Math.min.apply(null, this);
        }
    }
    ofType(type) {
        return Enumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return Enumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        super.reverse();
        return this;
    }
    select(keyOrSelector) {
        return Enumerable.select(this, keyOrSelector);
    }
    selectMany(selector) {
        return Enumerable.selectMany(this, selector);
    }
    sequenceEquals(second, comparer) {
        return Enumerable.sequenceEquals(this, second, comparer);
    }
    single(predicate) {
        return Enumerable.single(this, predicate);
    }
    singleOrDefault(predicate) {
        return Enumerable.singleOrDefault(this, predicate);
    }
    skip(count) {
        return Enumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return Enumerable.skipWhile(this, predicate);
    }
    sum(selector) {
        return Enumerable.sum(this, selector);
    }
    take(amount) {
        return Enumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return Enumerable.takeWhile(this, predicate);
    }
    toArray() {
        return Enumerable.toArray(this);
    }
    toMap(selector) {
        return Enumerable.toMap(this, selector);
    }
    toSet() {
        return Enumerable.toSet(this);
    }
    union(second, comparer) {
        return Enumerable.union(this, second, comparer);
    }
    where(predicate) {
        return Enumerable.where(this, predicate);
    }
    zip(second, resultSelector) {
        return Enumerable.zip(this, second, resultSelector);
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
class Grouping extends ArrayEnumerable {
    constructor(key, startingItem) {
        super(1);
        this.key = key;
        this[0] = startingItem;
    }
}
exports.Grouping = Grouping;
class BaseEnumerable {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return Enumerable.all(this, predicate);
    }
    any(predicate) {
        return Enumerable.any(this, predicate);
    }
    average(selector) {
        return Enumerable.average(this, selector);
    }
    concat(second) {
        return Enumerable.concat(this, second);
    }
    contains(value, comparer) {
        return Enumerable.contains(this, value, comparer);
    }
    count(predicate) {
        return Enumerable.count(this, predicate);
    }
    distinct(comparer) {
        return Enumerable.distinct(this, comparer);
    }
    elementAt(index) {
        return Enumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return Enumerable.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable.except(this, second, comparer);
    }
    first(predicate) {
        return Enumerable.first(this, predicate);
    }
    firstOrDefault(predicate) {
        return Enumerable.firstOrDefault(this, predicate);
    }
    each(action) {
        return Enumerable.each(this, action);
    }
    groupBy(keySelector, comparer) {
        return Enumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return Enumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return Enumerable.last(this, predicate);
    }
    lastOrDefault(predicate) {
        return Enumerable.lastOrDefault(this, predicate);
    }
    max(selector) {
        return Enumerable.max(this, selector);
    }
    min(selector) {
        return Enumerable.min(this, selector);
    }
    ofType(type) {
        return Enumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return Enumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        return Enumerable.reverse(this);
    }
    select(keyOrSelector) {
        return Enumerable.select(this, keyOrSelector);
    }
    selectMany(selector) {
        return Enumerable.selectMany(this, selector);
    }
    sequenceEquals(second, comparer) {
        return Enumerable.sequenceEquals(this, second, comparer);
    }
    single(predicate) {
        return Enumerable.single(this, predicate);
    }
    singleOrDefault(predicate) {
        return Enumerable.singleOrDefault(this, predicate);
    }
    skip(count) {
        return Enumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return Enumerable.skipWhile(this, predicate);
    }
    sum(selector) {
        return Enumerable.sum(this, selector);
    }
    take(amount) {
        return Enumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return Enumerable.takeWhile(this, predicate);
    }
    toArray() {
        return Enumerable.toArray(this);
    }
    toMap(selector) {
        return Enumerable.toMap(this, selector);
    }
    toSet() {
        return Enumerable.toSet(this);
    }
    union(second, comparer) {
        return Enumerable.union(this, second, comparer);
    }
    where(predicate) {
        return Enumerable.where(this, predicate);
    }
    zip(second, resultSelector) {
        return Enumerable.zip(this, second, resultSelector);
    }
}
exports.BaseEnumerable = BaseEnumerable;
class BasicEnumerable extends BaseEnumerable {
    constructor(iterator) {
        super();
        this.iterator = iterator;
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
}
exports.BasicEnumerable = BasicEnumerable;
class OrderedEnumerableDescending extends BasicEnumerable {
    constructor(map, comparer) {
        super(OrderedEnumerableDescending.generate(map, comparer));
        this.map = map;
    }
    static *unrollAndSort(map, comparer) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i];
            const values = map.get(key);
            if (values instanceof Map) {
                yield* OrderedEnumerableDescending.unrollAndSort(values, comparer);
            }
            else {
                for (const value of values) {
                    yield value;
                }
            }
        }
    }
    static generate(mapFunc, comparer) {
        return () => OrderedEnumerableDescending.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return Enumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return Enumerable.thenByDescending(this, keySelector, comparer);
    }
}
class OrderedEnumerable extends BasicEnumerable {
    constructor(map, comparer) {
        super(OrderedEnumerable.generate(map, comparer));
        this.map = map;
    }
    static *unrollAndSort(map, comparer) {
        for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
            const values = map.get(key);
            if (values instanceof Map) {
                yield* OrderedEnumerable.unrollAndSort(values, comparer);
            }
            else {
                for (const value of values) {
                    yield value;
                }
            }
        }
    }
    static generate(mapFunc, comparer) {
        return () => OrderedEnumerable.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return Enumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return Enumerable.thenByDescending(this, keySelector, comparer);
    }
}
class Enumerable {
    static aggregate(source, seedOrFunc, func, resultSelector) {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`);
            }
            return Enumerable.aggregate_3(source, seedOrFunc, func, resultSelector);
        }
        else if (func) {
            return Enumerable.aggregate_2(source, seedOrFunc, func);
        }
        else {
            return Enumerable.aggregate_1(source, seedOrFunc);
        }
    }
    static aggregate_1(source, func) {
        let aggregateValue;
        for (const value of source) {
            if (aggregateValue) {
                aggregateValue = func(aggregateValue, value);
            }
            else {
                aggregateValue = value;
            }
        }
        if (aggregateValue === undefined) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return aggregateValue;
    }
    static aggregate_2(source, seed, func) {
        let aggregateValue = seed;
        for (const value of source) {
            aggregateValue = func(aggregateValue, value);
        }
        return aggregateValue;
    }
    static aggregate_3(source, seed, func, resultSelector) {
        let aggregateValue = seed;
        for (const value of source) {
            aggregateValue = func(aggregateValue, value);
        }
        return resultSelector(aggregateValue);
    }
    static all(source, predicate) {
        for (const item of source) {
            if (predicate(item) === false) {
                return false;
            }
        }
        return true;
    }
    static any(source, predicate) {
        if (predicate) {
            return Enumerable.any_2(source, predicate);
        }
        else {
            return Enumerable.any_1(source);
        }
    }
    static any_1(source) {
        for (const _ of source) {
            return true;
        }
        return false;
    }
    static any_2(source, predicate) {
        for (const item of source) {
            if (predicate(item) === true) {
                return true;
            }
        }
        return false;
    }
    static average(source, selector) {
        if (selector) {
            return Enumerable.average_2(source, selector);
        }
        else {
            return Enumerable.average_1(source);
        }
    }
    static average_1(source) {
        let value;
        let count;
        for (const item of source) {
            value = (value || 0) + item;
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return value / count;
    }
    static average_2(source, func) {
        let value;
        let count;
        for (const item of source) {
            value = (value || 0) + func(item);
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return value / count;
    }
    static concat(first, second) {
        function* iterator() {
            yield* first;
            yield* second;
        }
        return new BasicEnumerable(iterator);
    }
    static contains(source, value, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        for (const item of source) {
            if (comparer(value, item)) {
                return true;
            }
        }
        return false;
    }
    static count(source, predicate) {
        if (predicate) {
            return Enumerable.count_2(source, predicate);
        }
        else {
            return Enumerable.count_1(source);
        }
    }
    static count_1(source) {
        let count = 0;
        for (const _ of source) {
            count++;
        }
        return count;
    }
    static count_2(source, predicate) {
        let count = 0;
        for (const value of source) {
            if (predicate(value) === true) {
                count++;
            }
        }
        return count;
    }
    static distinct(source, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        function* iterator() {
            const distinctElements = [];
            for (const item of source) {
                const foundItem = distinctElements.find((x) => comparer(x, item));
                if (!foundItem) {
                    distinctElements.push(item);
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static each(source, action) {
        for (const value of source) {
            action(value);
        }
        return source;
    }
    static elementAt(source, index) {
        let i = 0;
        for (const item of source) {
            if (index === i++) {
                return item;
            }
        }
        throw new TypesAndHelpers_1.ArgumentOutOfRangeException("index");
    }
    static elementAtOrDefault(source, index) {
        let i = 0;
        for (const item of source) {
            if (index === i++) {
                return item;
            }
        }
        return null;
    }
    static enumerateObject(source) {
        function* iterable() {
            for (const key in source) {
                yield {
                    first: key,
                    second: source[key],
                };
            }
        }
        return new BasicEnumerable(iterable);
    }
    static except(first, second, comparer = TypesAndHelpers_1.EqualityComparer) {
        function* iterator() {
            const secondArray = [...second];
            for (const firstItem of first) {
                let exists = false;
                for (let j = 0; j < secondArray.length; j++) {
                    const secondItem = secondArray[j];
                    if (comparer(firstItem, secondItem) === true) {
                        exists = true;
                        break;
                    }
                }
                if (exists === false) {
                    yield firstItem;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static first(source, predicate) {
        if (predicate) {
            return Enumerable.first_2(source, predicate);
        }
        else {
            return Enumerable.first_1(source);
        }
    }
    static first_1(source) {
        const first = source[Symbol.iterator]().next();
        if (first.done === true) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return first.value;
    }
    static first_2(source, predicate) {
        for (const value of source) {
            if (predicate(value) === true) {
                return value;
            }
        }
        throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
    }
    static firstOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.firstOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.firstOrDefault_1(source);
        }
    }
    static firstOrDefault_1(source) {
        const first = source[Symbol.iterator]().next();
        return first.value || null;
    }
    static firstOrDefault_2(source, predicate) {
        for (const value of source) {
            if (predicate(value) === true) {
                return value;
            }
        }
        return null;
    }
    static flatten(source, shallow) {
        function* iterator(source) {
            for (const item of source) {
                if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                    yield* shallow ? item : iterator(item);
                }
                else {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(() => iterator(source));
    }
    static from(source) {
        if (Array.isArray(source)) {
            function* iterator() {
                for (const value of source) {
                    yield value;
                }
            }
            return new BasicEnumerable(iterator);
        }
        else {
            return new BasicEnumerable(() => source);
        }
    }
    static groupBy(source, keySelector, comparer) {
        if (comparer) {
            return Enumerable.groupBy_0(source, keySelector, comparer);
        }
        else {
            return Enumerable.groupBy_0_Simple(source, keySelector);
        }
    }
    static groupBy_0_Simple(source, keySelector) {
        function* iterator() {
            const keyMap = {};
            for (const value of source) {
                const key = keySelector(value);
                const grouping = keyMap[key];
                if (grouping) {
                    grouping.push(value);
                }
                else {
                    keyMap[key] = new Grouping(key, value);
                }
            }
            for (const value in keyMap) {
                yield keyMap[value];
            }
        }
        return new BasicEnumerable(iterator);
    }
    static groupBy_0(source, keySelector, comparer) {
        function* generate() {
            const keyMap = new Array();
            for (const value of source) {
                const key = keySelector(value);
                let found = false;
                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i];
                    if (comparer(group.key, key)) {
                        group.push(value);
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    keyMap.push(new Grouping(key, value));
                }
            }
            for (const keyValue of keyMap) {
                yield keyValue;
            }
        }
        return new BasicEnumerable(generate);
    }
    static groupByWithSel(source, keySelector, elementSelector, comparer) {
        if (comparer) {
            return Enumerable.GroupBy_1(source, keySelector, elementSelector, comparer);
        }
        else {
            return Enumerable.GroupBy_1_Simple(source, keySelector, elementSelector);
        }
    }
    static GroupBy_1_Simple(source, keySelector, elementSelector) {
        function* generate() {
            const keyMap = {};
            for (const value of source) {
                const key = keySelector(value);
                const grouping = keyMap[key];
                const element = elementSelector(value);
                if (grouping) {
                    grouping.push(element);
                }
                else {
                    keyMap[key] = new Grouping(key, element);
                }
            }
            for (const value in keyMap) {
                yield keyMap[value];
            }
        }
        return new BasicEnumerable(generate);
    }
    static GroupBy_1(source, keySelector, elementSelector, comparer) {
        function* generate() {
            const keyMap = new Array();
            for (const value of source) {
                const key = keySelector(value);
                let found = false;
                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i];
                    if (comparer(group.key, key)) {
                        group.push(elementSelector(value));
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    const element = elementSelector(value);
                    keyMap.push(new Grouping(key, element));
                }
            }
            for (const keyValue of keyMap) {
                yield keyValue;
            }
        }
        return new BasicEnumerable(generate);
    }
    static groupByWithResult(source, keySelector, resultSelector, comparer) {
        if (comparer) {
            return Enumerable.GroupBy_2(source, keySelector, resultSelector, comparer);
        }
        else {
            return Enumerable.GroupBy_2_Simple(source, keySelector, resultSelector);
        }
    }
    static GroupBy_2_Simple(source, keySelector, resultSelector) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_0_Simple(source, keySelector);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable(iterator);
    }
    static GroupBy_2(source, keySelector, resultSelector, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_0(source, keySelector, comparer);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable(iterator);
    }
    static GroupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
        if (comparer) {
            return Enumerable.GroupBy_3(source, keySelector, elementSelector, resultSelector);
        }
        else {
            return Enumerable.GroupBy_3_Simple(source, keySelector, elementSelector, resultSelector);
        }
    }
    static GroupBy_3(source, keySelector, elementSelector, resultSelector, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        function* iterator() {
            const groupByResult = Enumerable.GroupBy_1(source, keySelector, elementSelector, comparer);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable(iterator);
    }
    static GroupBy_3_Simple(source, keySelector, elementSelector, resultSelector) {
        function* iterator() {
            const groupByResult = Enumerable.GroupBy_1_Simple(source, keySelector, elementSelector);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable(iterator);
    }
    static join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        function* iterator() {
            const innerArray = [...inner];
            for (const o of outer) {
                const outerKey = outerKeySelector(o);
                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i);
                    if (comparer(outerKey, innerKey) === true) {
                        yield resultSelector(o, i);
                    }
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static intersect(first, second, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        function* iterator() {
            const firstResults = [...first.distinct(comparer)];
            if (firstResults.length === 0) {
                return;
            }
            const secondResults = [...second];
            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i];
                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j];
                    if (comparer(firstValue, secondValue) === true) {
                        yield firstValue;
                        break;
                    }
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static partition(source, predicate) {
        const fail = [];
        const pass = [];
        for (const value of source) {
            if (predicate(value) === true) {
                pass.push(value);
            }
            else {
                fail.push(value);
            }
        }
        return [fail, pass];
    }
    static select(source, selector) {
        if (typeof selector === "string") {
            return Enumerable.select_2(source, selector);
        }
        else {
            return Enumerable.select_1(source, selector);
        }
    }
    static select_1(source, selector) {
        function* iterator() {
            for (const value of source) {
                yield selector(value);
            }
        }
        return new BasicEnumerable(iterator);
    }
    static select_2(source, key) {
        function* iterator() {
            for (const value of source) {
                yield value[key];
            }
        }
        return new BasicEnumerable(iterator);
    }
    static selectMany(source, selector) {
        if (typeof selector === "string") {
            return Enumerable.selectMany_2(source, selector);
        }
        else {
            return Enumerable.selectMany_1(source, selector);
        }
    }
    static selectMany_1(source, selector) {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of selector(value)) {
                    yield selectorValue;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static selectMany_2(source, selector) {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of value[selector]) {
                    yield selectorValue;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static single(source, predicate) {
        if (predicate) {
            return Enumerable.single_2(source, predicate);
        }
        else {
            return Enumerable.single_1(source);
        }
    }
    static single_1(source) {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
            if (hasValue === true) {
                throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.MoreThanOneElement);
            }
            else {
                hasValue = true;
                singleValue = value;
            }
        }
        if (hasValue === false) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return singleValue;
    }
    static single_2(source, predicate) {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        if (hasValue === false) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
        }
        return singleValue;
    }
    static singleOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.singleOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.singleOrDefault_1(source);
        }
    }
    static singleOrDefault_1(source) {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
            if (hasValue === true) {
                throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.MoreThanOneElement);
            }
            else {
                hasValue = true;
                singleValue = value;
            }
        }
        return singleValue;
    }
    static singleOrDefault_2(source, predicate) {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        return singleValue;
    }
    static skipWhile(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.skipWhile_1(source, predicate);
        }
        else {
            return Enumerable.skipWhile_2(source, predicate);
        }
    }
    static skipWhile_1(source, predicate) {
        function* iterator() {
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield item;
                }
                else if (predicate(item) === false) {
                    skip = false;
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static skipWhile_2(source, predicate) {
        function* iterator() {
            let index = 0;
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield item;
                }
                else if (predicate(item, index) === false) {
                    skip = false;
                    yield item;
                }
                index++;
            }
        }
        return new BasicEnumerable(iterator);
    }
    static skip(source, count) {
        function* iterator() {
            let i = 0;
            for (const item of source) {
                if (i++ >= count) {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static empty() {
        const iterator = function* () {
            for (const x of []) {
                yield x;
            }
        };
        return new BasicEnumerable(iterator);
    }
    static last(source, predicate) {
        if (predicate) {
            return Enumerable.last_2(source, predicate);
        }
        else {
            return Enumerable.last_1(source);
        }
    }
    static last_1(source) {
        let last = null;
        for (const value of source) {
            last = value;
        }
        if (!last) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return last;
    }
    static last_2(source, predicate) {
        let last = null;
        for (const value of source) {
            if (predicate(value) === true) {
                last = value;
            }
        }
        if (!last) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoMatch);
        }
        return last;
    }
    static lastOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.lastOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.lastOrDefault_1(source);
        }
    }
    static lastOrDefault_1(source) {
        let last = null;
        for (const value of source) {
            last = value;
        }
        return last;
    }
    static lastOrDefault_2(source, predicate) {
        let last = null;
        for (const value of source) {
            if (predicate(value) === true) {
                last = value;
            }
        }
        return last;
    }
    static max(source, selector) {
        if (selector) {
            return Enumerable.max_2(source, selector);
        }
        else {
            return Enumerable.max_1(source);
        }
    }
    static max_1(source) {
        let max = null;
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, item);
        }
        if (max === null) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    }
    static max_2(source, selector) {
        let max = null;
        for (const item of source) {
            max = Math.max(max || Number.MIN_VALUE, selector(item));
        }
        if (max === null) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    }
    static min(source, selector) {
        if (selector) {
            return Enumerable.min_2(source, selector);
        }
        else {
            return Enumerable.min_1(source);
        }
    }
    static min_1(source) {
        let min = null;
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, item);
        }
        if (min === null) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        else {
            return min;
        }
    }
    static min_2(source, selector) {
        let min = null;
        for (const item of source) {
            min = Math.min(min || Number.MAX_VALUE, selector(item));
        }
        if (min === null) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        else {
            return min;
        }
    }
    static ofType(source, type) {
        if (!type) {
            return source;
        }
        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type);
        function* iterator() {
            for (const item of source) {
                if (typeCheck(item)) {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static orderByInner(source, keySelector) {
        return function lazyMap() {
            const map = new Map();
            for (const item of source) {
                const key = keySelector(item);
                const currentMapping = map.get(key);
                if (currentMapping) {
                    currentMapping.push(item);
                }
                else {
                    map.set(key, [item]);
                }
            }
            return map;
        };
    }
    static orderBy(source, keySelector, comparer) {
        return new OrderedEnumerable(Enumerable.orderByInner(source, keySelector), comparer);
    }
    static orderByDescending(source, keySelector, comparer) {
        return new OrderedEnumerableDescending(Enumerable.orderByInner(source, keySelector), comparer);
    }
    static range(start, count) {
        function* iterator() {
            const max = start + count;
            for (let i = start; i < max; i++) {
                yield i;
            }
        }
        return new BasicEnumerable(iterator);
    }
    static repeat(element, count) {
        function* iterator() {
            for (let i = 0; i < count; i++) {
                yield element;
            }
        }
        return new BasicEnumerable(iterator);
    }
    static reverse(source) {
        function* iterator() {
            for (const x of [...source].reverse()) {
                yield x;
            }
        }
        return new BasicEnumerable(iterator);
    }
    static sequenceEquals(first, second, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
        const firstIterator = first[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        let firstResult = firstIterator.next();
        let secondResult = secondIterator.next();
        while (!firstResult.done && !secondResult.done) {
            if (!comparer(firstResult.value, secondResult.value)) {
                return false;
            }
            firstResult = firstIterator.next();
            secondResult = secondIterator.next();
        }
        return firstResult.done && secondResult.done;
    }
    static sum(source, selector) {
        if (selector) {
            return Enumerable.sum_2(source, selector);
        }
        else {
            return Enumerable.sum_1(source);
        }
    }
    static sum_1(source) {
        let sum = 0;
        for (const value of source) {
            sum += value;
        }
        return sum;
    }
    static sum_2(source, selector) {
        let sum = 0;
        for (const value of source) {
            sum += selector(value);
        }
        return sum;
    }
    static take(source, amount) {
        function* iterator() {
            let amountLeft = amount > 0 ? amount : 0;
            for (const item of source) {
                if (amountLeft-- === 0) {
                    break;
                }
                else {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static takeWhile(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.takeWhile_1(source, predicate);
        }
        else {
            return Enumerable.takeWhile_2(source, predicate);
        }
    }
    static takeWhile_1(source, predicate) {
        function* iterator() {
            for (const item of source) {
                if (predicate(item)) {
                    yield item;
                }
                else {
                    break;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static takeWhile_2(source, predicate) {
        function* iterator() {
            let index = 0;
            for (const item of source) {
                if (predicate(item, index++)) {
                    yield item;
                }
                else {
                    break;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static thenBy(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedEnumerable(() => sortInnerMost(source.getMap()), comparer);
    }
    static thenByDescending(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedEnumerableDescending(() => sortInnerMost(source.getMap()), comparer);
    }
    static toArray(source) {
        return [...source];
    }
    static toMap(source, selector) {
        const map = new Map();
        for (const value of source) {
            const key = selector(value);
            const array = map.get(key);
            if (array === undefined) {
                map.set(key, [value]);
            }
            else {
                array.push(value);
            }
        }
        return map;
    }
    static toObject(source, selector) {
        const map = {};
        for (const value of source) {
            map[selector(value)] = value;
        }
        return map;
    }
    static toSet(source) {
        return new Set(source);
    }
    static union(first, second, comparer) {
        if (comparer) {
            return Enumerable.union_2(first, second, comparer);
        }
        else {
            return Enumerable.union_1(first, second);
        }
    }
    static union_1(first, second) {
        function* iterator() {
            const set = new Set();
            for (const item of first) {
                if (set.has(item) === false) {
                    yield item;
                    set.add(item);
                }
            }
            for (const item of second) {
                if (set.has(item) === false) {
                    yield item;
                    set.add(item);
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static union_2(first, second, comparer) {
        function* iterator() {
            const result = [];
            for (const source of [first, second]) {
                for (const value of source) {
                    let exists = false;
                    for (const resultValue of result) {
                        if (comparer(value, resultValue) === true) {
                            exists = true;
                            break;
                        }
                    }
                    if (exists === false) {
                        yield value;
                        result.push(value);
                    }
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static where(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.where_1(source, predicate);
        }
        else {
            return Enumerable.where_2(source, predicate);
        }
    }
    static where_1(source, predicate) {
        function* iterator() {
            for (const item of source) {
                if (predicate(item) === true) {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static where_2(source, predicate) {
        function* iterator() {
            let i = 0;
            for (const item of source) {
                if (predicate(item, i++) === true) {
                    yield item;
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static zip(source, second, resultSelector) {
        if (resultSelector) {
            return Enumerable.zip_2(source, second, resultSelector);
        }
        else {
            return Enumerable.zip_1(source, second);
        }
    }
    static zip_1(source, second) {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]();
            const secondIterator = second[Symbol.iterator]();
            while (true) {
                const a = firstIterator.next();
                const b = secondIterator.next();
                if (a.done && b.done) {
                    break;
                }
                else {
                    yield TypesAndHelpers_1.AsTuple(a.value, b.value);
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    static zip_2(source, second, resultSelector) {
        function* iterator() {
            const firstIterator = source[Symbol.iterator]();
            const secondIterator = second[Symbol.iterator]();
            while (true) {
                const a = firstIterator.next();
                const b = secondIterator.next();
                if (a.done && b.done) {
                    break;
                }
                else {
                    yield resultSelector(a.value, b.value);
                }
            }
        }
        return new BasicEnumerable(iterator);
    }
    constructor() {
    }
}
exports.Enumerable = Enumerable;
