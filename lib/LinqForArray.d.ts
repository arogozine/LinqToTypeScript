import { IEnumerable } from "./Interfaces";
declare global  {
    interface Array<T> extends IEnumerable<T> {
    }
    interface Uint8Array extends IEnumerable<number> {
    }
    interface Uint8ClampedArray extends IEnumerable<number> {
    }
    interface Uint16Array extends IEnumerable<number> {
    }
    interface Uint32Array extends IEnumerable<number> {
    }
    interface Int8Array extends IEnumerable<number> {
    }
    interface Int16Array extends IEnumerable<number> {
    }
    interface Int32Array extends IEnumerable<number> {
    }
    interface Float32Array extends IEnumerable<number> {
    }
    interface Float64Array extends IEnumerable<number> {
    }
}
