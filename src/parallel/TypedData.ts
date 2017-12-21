import { DataType } from "./DataType"

export type TypedData<T> = {
    type: DataType.PromiseToArray,
    generator: () => Promise<T[]>,
} | {
    type: DataType.ArrayOfPromises,
    generator: () => Array<Promise<T>>,
} | {
    type: DataType.PromiseOfPromises,
    generator: () => Promise<Array<Promise<T>>>,
}
