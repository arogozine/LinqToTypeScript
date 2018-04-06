"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("./sync/sync");
__export(require("./shared/shared"));
__export(require("./sync/sync"));
__export(require("./async/async"));
__export(require("./parallel/parallel"));
function bindLinq(object) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.BaseEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || sync_1.BaseEnumerable.prototype[prop];
    }
}
exports.bindLinq = bindLinq;
function bindArray(object) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        object.prototype[prop] = object.prototype[prop] || sync_1.ArrayEnumerable.prototype[prop];
    }
}
exports.bindArray = bindArray;
function initializeLinq() {
    bindArray(Array);
    bindLinq(Map);
    bindLinq(Set);
    bindLinq(String);
    bindArray(Int8Array);
    bindArray(Int16Array);
    bindArray(Int32Array);
    bindArray(Uint8Array);
    bindArray(Uint8ClampedArray);
    bindArray(Uint16Array);
    bindArray(Uint32Array);
    bindArray(Float32Array);
    bindArray(Float64Array);
}
exports.initializeLinq = initializeLinq;
