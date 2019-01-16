import { BasicParallelEnumerable } from "./BasicParallelEnumerable"
import { bindLinqParallel } from "./bindLinqParallel"

export const initializeParallelTypes = () => {
    bindLinqParallel(BasicParallelEnumerable)
}
