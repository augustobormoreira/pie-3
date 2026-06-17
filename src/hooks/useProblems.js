import { useState } from 'react'
import { INITIAL_PROBLEMS } from '../data/problems'

export function useProblems() {
  const [problems, setProblems] = useState(INITIAL_PROBLEMS)

  const addProblem = async (problemData) => {
    await new Promise((r) => setTimeout(r, 300))
    const newProblem = {
      ...problemData,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    }
    setProblems((prev) => [...prev, newProblem])
    return newProblem
  }

  const removeProblem = async (id) => {
    await new Promise((r) => setTimeout(r, 200))
    setProblems((prev) => prev.filter((p) => p.id !== id))
  }

  return { problems, addProblem, removeProblem }
}
