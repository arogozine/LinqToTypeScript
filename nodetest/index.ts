import { range } from "linq-to-typescript"

const primeNumbers = range(2, 10000)
    .select((i) => [i, Math.floor(Math.sqrt(i))])
    .where(([i, iSq]) =>
        range(2, iSq).all((j) => i % j !== 0))
    .select(([prime]) => prime)
    .toArray()

async function asyncIterable() {
    for await (const i of  range(0, 10).selectAsync(async (x) => x * 2)) {
        console.log(i)
    }
}

asyncIterable()
console.log(primeNumbers)