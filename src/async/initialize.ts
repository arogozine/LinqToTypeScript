import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"
import { bindLinqAsync } from "./bindLinqAsync"

export const initializeAsyncTypes = () => {
    bindLinqAsync(BasicAsyncEnumerable)
}
