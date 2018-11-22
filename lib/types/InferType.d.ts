import { IConstructor } from "./";
/**
 * Accepted inputs for the ofType function
 */
export declare type OfType = "object" | "function" | "symbol" | "boolean" | "number" | "string" | IConstructor<any>;
/**
 * Determines the return type based on the input type T.
 * @see {OfType}
 */
export declare type InferType<T> = T extends "object" ? object : (T extends "function" ? Function : (T extends "symbol" ? Symbol : (T extends "boolean" ? boolean : (T extends "number" ? number : (T extends "string" ? string : (T extends IConstructor<infer TResult> ? TResult : never))))));
