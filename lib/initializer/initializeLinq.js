"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bindArray_1 = require("./bindArray");
const bindLinq_1 = require("./bindLinq");
/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
function initializeLinq() {
    bindArray_1.bindArray(Array);
    bindLinq_1.bindLinq(Map);
    bindLinq_1.bindLinq(Set);
    bindLinq_1.bindLinq(String);
    bindArray_1.bindArray(Int8Array);
    bindArray_1.bindArray(Int16Array);
    bindArray_1.bindArray(Int32Array);
    bindArray_1.bindArray(Uint8Array);
    bindArray_1.bindArray(Uint8ClampedArray);
    bindArray_1.bindArray(Uint16Array);
    bindArray_1.bindArray(Uint32Array);
    bindArray_1.bindArray(Float32Array);
    bindArray_1.bindArray(Float64Array);
}
exports.initializeLinq = initializeLinq;
