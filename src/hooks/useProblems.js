import { useState } from 'react'
import { INITIAL_PROBLEMS } from '../data/problems'
import { DEFAULT_STATUS } from '../data/problemStatus'

export function useProblems() {
  const [problems, setProblems] = useState(INITIAL_PROBLEMS)

  const addProblem = async (problemData) => {
    await new Promise((r) => setTimeout(r, 300))
    const newProblem = {
      ...problemData,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      status: DEFAULT_STATUS,
      statusNote: '',
      statusUpdatedAt: null,
    }
    setProblems((prev) => [...prev, newProblem])
    return newProblem
  }

  const removeProblem = async (id) => {
    await new Promise((r) => setTimeout(r, 200))
    setProblems((prev) => prev.filter((p) => p.id !== id))
  }
  const updateProblemStatus = async (id, status, note) => {
    await new Promise((r) => setTimeout(r, 300))
    setProblems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              statusNote: note,
              statusUpdatedAt: new Date().toISOString().slice(0, 10),
            }
          : p
      )
    )
  }

  return { problems, addProblem, removeProblem, updateProblemStatus }
}

