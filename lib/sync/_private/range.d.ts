import { IEnumerable } from "../IEnumerable";
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
export declare function range(start: number, count: number): IEnumerable<number>;
