// Not Yet Supported By Anything
import "core-js/modules/es.symbol.async-iterator"

import { BasicAsyncEnumerable } from "../async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "../parallel/BasicParallelEnumerable"
import { BasicEnumerable } from "../sync/BasicEnumerable"
import { bindArrayEnumerable } from "./bindArrayEnumerable"
import { bindLinq } from "./bindLinq"
import { bindLinqAsync } from "./bindLinqAsync"
import { bindLinqParallel } from "./bindLinqParallel"

bindArrayEnumerable()
bindLinq(BasicEnumerable)
bindLinqAsync(BasicAsyncEnumerable)
bindLinqParallel(BasicParallelEnumerable)

export { bindLinq }
export { bindLinqAsync }
export { initializeLinq } from "./initializeLinq"
