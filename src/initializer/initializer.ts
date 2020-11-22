import { BasicAsyncEnumerable } from "../async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "../parallel/BasicParallelEnumerable"
import { BasicEnumerable } from "../sync/BasicEnumerable"
import { bindArray } from "./bindArray"
import { bindArrayEnumerable } from "./bindArrayEnumerable"
import { bindLinq } from "./bindLinq"
import { bindLinqAsync } from "./bindLinqAsync"
import { bindLinqParallel } from "./bindLinqParallel"
import { ArrayEnumerable } from '../sync'

bindLinq(ArrayEnumerable)
bindArrayEnumerable()
bindLinq(BasicEnumerable)
bindLinqAsync(BasicAsyncEnumerable)
bindLinqParallel(BasicParallelEnumerable)

export { bindLinq, bindArray }
export { bindLinqAsync }
export { initializeLinq } from "./initializeLinq"
