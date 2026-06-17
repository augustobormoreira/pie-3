import { useState } from 'react'
import { BOOKS_CATALOG, searchBooks } from '../data/books'

// Simulates integration with the Koha ILS REST API.
// In production:
//   GET  /api/v1/biblios?title=...&category=...   -> search()
//   POST /api/v1/holds { biblio_id, patron_id }    -> reserve()
export function useKohaCatalog() {
  const [results, setResults] = useState(BOOKS_CATALOG)
  const [loading, setLoading] = useState(false)

  const search = async ({ query, category }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 250)) // simulate API latency
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
    // In production this would create a hold record via Koha's /api/v1/holds
    return { success: true, holdId: Date.now() }
  }

  return { results, search, reserve, loading }
}
