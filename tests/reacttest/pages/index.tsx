import type { NextPage } from 'next'
import { range } from "linq-to-typescript"
import { ChangeEvent, useState } from 'react'

const generateNumbers = (max: number) => {
  const primeNumbers = range(2, max)
    .select((i) => [i, Math.floor(Math.sqrt(i))])
    .where(([i, iSq]) =>
        range(2, iSq).all((j) => i % j !== 0))
    .select(([prime]) => prime)
    .toArray()

  return primeNumbers
}

interface IHomeState {
  value: number
  numbers: number[]
}

const Home: NextPage = () => {
  const [state, dispatch] = useState<IHomeState>({ value: 100, numbers: generateNumbers(100) })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const numbers = generateNumbers(value)
    dispatch({ value, numbers })
  }

  const numbers = state
    .numbers
    .map(x => <li key={x}>{x}</li>)

  return (
    <>
      <ul>
        {numbers}
      </ul>
      <input type="number" min={0} value={state.value} onChange={onChange} />
    </>
  )
}

export default Home
