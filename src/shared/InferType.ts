import { IConstructor } from ".."

export type OfType =
    "object" | "function" | "symbol" | "boolean" | "number" | "string" |
    IConstructor<any>

// tslint:disable:ban-types
export type InferType<T> =
    T extends "object" ? object :
    (T extends "function" ? Function :
    (T extends "symbol" ? Symbol :
    (T extends "boolean" ? boolean :
    (T extends "number" ? number :
    (T extends "string" ? string :
    (T extends IConstructor<infer TResult> ? TResult : never))))))
