import { bindArray } from "./bindArray"
import { bindString } from "./bindString"
import { bindLinq } from "./bindLinq"

/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export const initializeLinq = () => {
    bindLinq(Map)
    bindLinq(Set)
    bindString()

    bindArray(Array)
    bindArray(Int8Array)
    bindArray(Int16Array)
    bindArray(Int32Array)
    bindArray(Uint8Array)
    bindArray(Uint8ClampedArray)
    bindArray(Uint16Array)
    bindArray(Uint32Array)
    bindArray(Float32Array)
    bindArray(Float64Array)
}
