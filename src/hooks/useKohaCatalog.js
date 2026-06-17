import { useState } from 'react'
import BookCard from '../components/BookCard'
import BookDetailModal from '../components/BookDetailModal'
import { BOOKS_CATALOG, searchBooks, getCategories } from '../data/books'
import { useKohaCatalog } from '../hooks/useKohaCatalog'
import styles from '../styles/Library.module.css'

const CATEGORIES = getCategories()

export default function LibraryPage({ showToast }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(null)

  const { results, search, reserve } = useKohaCatalog()

  const handleSearch = () => search({ query, category })

  const handleReserve = async (book) => {
    try {
      await reserve(book)
      showToast(`"${book.title}" reservado com sucesso! Retire em: ${book.location}`, 'success')
      setSelected(null)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const availableCount = BOOKS_CATALOG.filter((b) => b.available).length

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>📚 Catálogo de Bibliotecas — Ituiutaba</h1>
        <p className={styles.subtitle}>
          Sistema integrado Koha · {BOOKS_CATALOG.length} obras cadastradas · {availableCount} disponíveis
        </p>
      </div>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Buscar por título, autor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <select
          className={styles.searchSelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c === 'all' ? 'Todas as categorias' : c}</option>
          ))}
        </select>
        <button className={styles.searchBtn} onClick={handleSearch}>🔍 Buscar</button>
      </div>

      <p className={styles.resultCount}>{results.length} resultado(s) encontrado(s)</p>

      <div className={styles.grid}>
        {results.map((book) => (
          <BookCard key={book.id} book={book} onClick={setSelected} />
        ))}
        {results.length === 0 && (
          <div className={styles.empty}>Nenhum livro encontrado. Tente outro termo.</div>
        )}
      </div>

      <BookDetailModal
        book={selected}
        onClose={() => setSelected(null)}
        onReserve={handleReserve}
      />
    </div>
  )
}
