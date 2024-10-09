import type { IConstructor } from "./"
/* eslint-disable @typescript-eslint/ban-types */

/**
 * Accepted inputs for the ofType function
 */
export type OfType =
    "object" | "function" | "symbol" | "boolean" | "number" | "string" |
    IConstructor<any>

/**
 * Determines the return type based on the input type T.
 * @see {OfType}
 */
export type InferType<T> =
    T extends "object" ? object :
    (T extends "function" ? Function :
    (T extends "symbol" ? Symbol :
    (T extends "boolean" ? boolean :
    (T extends "number" ? number :
    (T extends "string" ? string :
    (T extends IConstructor<infer TResult> ? TResult : never))))))
