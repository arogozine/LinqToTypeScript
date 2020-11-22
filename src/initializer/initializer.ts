import { BasicAsyncEnumerable } from "../async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "../parallel/BasicParallelEnumerable"
import { BasicEnumerable } from "../sync/BasicEnumerable"
import { bindArray } from "./bindArray"
import { bindArrayEnumerable } from "./bindArrayEnumerable"
import { bindLinq } from "./bindLinq"
import { bindLinqAsync } from "./bindLinqAsync"
import { bindLinqParallel } from "./bindLinqParallel"
import { bindString } from "./bindString"

// To avoid circular dependencies, we bind LINQ methods to classes here
bindLinq(BasicEnumerable)
bindLinqAsync(BasicAsyncEnumerable)
bindLinqParallel(BasicParallelEnumerable)
// Array Enumerable extends Array and has some custom optimizations
bindArrayEnumerable()

export { bindLinq, bindArray, bindString }
export { bindLinqAsync }
export { initializeLinq } from "./initializeLinq"
