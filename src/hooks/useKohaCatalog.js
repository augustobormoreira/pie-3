import { useState } from 'react'
import { BOOKS_CATALOG, searchBooks } from '../data/books'
export function useKohaCatalog() {
  const [results, setResults] = useState(BOOKS_CATALOG)
  const [loading, setLoading] = useState(false)

  const search = async ({ query, category }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 250))
    setResults(searchBooks({ query, category }))
    setLoading(false)
  }

  const reserve = async (book) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 350))
    setLoading(false)
    if (!book.available) {
      throw new Error('Livro indisponível no momento.')
    }
    return { success: true, holdId: Date.now() }
  }

  return { results, search, reserve, loading }
}
