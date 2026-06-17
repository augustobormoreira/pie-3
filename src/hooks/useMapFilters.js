import { useState, useCallback } from 'react'
import { PROBLEM_TYPES } from '../data/problemTypes'

const ALL_TYPES = new Set(PROBLEM_TYPES.map((t) => t.id))

export function useMapFilters(userId) {
  const [filters, setFilters] = useState({
    types: new Set(ALL_TYPES),
    period: 'all',   // 'all' | '7' | '30'
    onlyMine: false,
  })

  const toggleType = useCallback((id) => {
    setFilters((f) => {
      const next = new Set(f.types)
      next.has(id) ? next.delete(id) : next.add(id)
      return { ...f, types: next }
    })
  }, [])

  const setPeriod = useCallback((period) => {
    setFilters((f) => ({ ...f, period }))
  }, [])

  const setOnlyMine = useCallback((val) => {
    setFilters((f) => ({ ...f, onlyMine: val }))
  }, [])

  const applyFilters = useCallback(
    (problems) => {
      return problems.filter((p) => {
        if (!filters.types.has(p.type)) return false
        if (filters.onlyMine && p.userId !== userId) return false
        if (filters.period !== 'all') {
          const diff = (Date.now() - new Date(p.date)) / (1000 * 60 * 60 * 24)
          if (diff > Number(filters.period)) return false
        }
        return true
      })
    },
    [filters, userId]
  )

  return { filters, toggleType, setPeriod, setOnlyMine, applyFilters }
}
