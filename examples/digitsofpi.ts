import { range } from "linq-to-typescript"

const piConvergence = (term: number) => {
    // Nilakantha Series
    if (term === 1) {
        return 3;
    }

    return range(1, term - 1)
        .select(x => x << 1)
        .select((x, index) => {
            const denominator = x * (x + 1) * (x + 2)
            const numerator = index % 2 ? -4 : 4
            return numerator / denominator
        })
        .aggregate(3, (x, y) => x + y)
}

console.log(Math.abs(piConvergence(390) - Math.PI))