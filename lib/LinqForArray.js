"use strict";
const TypesAndHelpers_1 = require("./TypesAndHelpers");
Array.prototype.any = function (predicate) {
    return this.some(predicate || (x => true));
};
Array.prototype.all = function (predicate) {
    return this.every(predicate);
};
Array.prototype.count = function (predicate) {
    if (predicate) {
        let count = 0;
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i])) {
                count++;
            }
        }
        return count;
    }
    else {
        return this.length;
    }
};
Array.prototype.elementAt = function (index) {
    if (index >= this.length) {
        throw new TypesAndHelpers_1.ArgumentOutOfRangeException("index");
    }
    return this[index];
};
Array.prototype.first = function (predicate) {
    if (predicate) {
        const value = this.find(predicate);
        if (typeof value === "undefined") {
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
};
Array.prototype.firstOrDefault = function (predicate) {
    if (predicate) {
        const value = this.find(predicate);
        if (typeof value === "undefined") {
            return null;
        }
        else {
            return value;
        }
    }
    else {
        return this.length === 0 ? null : this[0];
    }
};
Array.prototype.max = function (selector) {
    if (selector) {
        let max = Number.MIN_VALUE;
        for (let i = 0; i < this.length; i++) {
            max = Math.max(selector(this[i]), max);
        }
        return max;
    }
    else {
        return Math.max(...this);
    }
};
Array.prototype.min = function (selector) {
    if (selector) {
        let min = Number.MAX_VALUE;
        for (let i = 0; i < this.length; i++) {
            min = Math.min(selector(this[i]), min);
        }
        return min;
    }
    else {
        return Math.min(...this);
    }
};
Array.prototype.toArray = function () {
    return this.slice();
};
Array.prototype.toMap = function (selector) {
    const map = new Map();
    for (let i = 0; i < this.length; i++) {
        const value = this[i];
        const key = selector(value);
        const valuesForKey = map.get(key);
        if (valuesForKey) {
            valuesForKey.push(value);
        }
        else {
            map.set(key, [value]);
        }
    }
    return map;
};
Array.prototype.where = function (predicate) {
    return this.filter(predicate);
};
