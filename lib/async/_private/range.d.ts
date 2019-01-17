import { IAsyncEnumerable } from "../../types";
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 * OR start + count -1 is larger than MAX_SAFE_INTEGER.
 * @returns An IAsyncEnumerable<number> that contains a range of sequential integral numbers.
 */
export declare function range(start: number, count: number): IAsyncEnumerable<number>;
