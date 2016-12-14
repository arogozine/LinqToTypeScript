"use strict";
const TypesAndHelpers_1 = require("./TypesAndHelpers");
function bindArray(_array) {
    _array.prototype.all = function (predicate) {
        return this.every(predicate);
    };
    _array.prototype.any = function (predicate) {
        return this.some(predicate || (x => true));
    };
    _array.prototype.count = function (predicate) {
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
    };
    _array.prototype.elementAt = function (index) {
        if (index >= this.length) {
            throw new TypesAndHelpers_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    };
    _array.prototype.first = function (predicate) {
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
    _array.prototype.firstOrDefault = function (predicate) {
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
    _array.prototype.last = function (predicate) {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
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
    };
    _array.prototype.lastOrDefault = function (predicate) {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
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
    };
    _array.prototype.max = function (selector) {
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
            return Math.max(...this);
        }
    };
    _array.prototype.min = function (selector) {
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
            return Math.min(...this);
        }
    };
    _array.prototype.toArray = function () {
        const array = new Array(this.length);
        for (let i = 0; i < this.length; i++) {
            array[i] = this[i];
        }
        return array;
    };
    _array.prototype.toMap = function (selector) {
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
    _array.prototype.where = function (predicate) {
        return this.filter(predicate);
    };
}
bindArray(Array);
bindArray(Int8Array);
bindArray(Int16Array);
bindArray(Int32Array);
bindArray(Uint8Array);
bindArray(Uint8ClampedArray);
bindArray(Uint16Array);
bindArray(Uint32Array);
bindArray(Float32Array);
bindArray(Float64Array);
