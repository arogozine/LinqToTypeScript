import { IEnumerable } from "linq-to-typescript"

// 1. Declare that the JS types implement the IEnumerable interface
declare global {
    interface Array<T> extends IEnumerable<T> { }
    interface Uint8Array extends IEnumerable<number> { }
    interface Uint8ClampedArray extends IEnumerable<number> { }
    interface Uint16Array extends IEnumerable<number> { }
    interface Uint32Array extends IEnumerable<number> { }
    interface Int8Array extends IEnumerable<number> { }
    interface Int16Array extends IEnumerable<number> { }
    interface Int32Array extends IEnumerable<number> { }
    interface Float32Array extends IEnumerable<number> { }
    interface Float64Array extends IEnumerable<number> { }
    interface Map<K, V> extends IEnumerable<[K, V]> { }
    interface Set<T> extends IEnumerable<T> { }
    interface String extends IEnumerable<string> { }
}