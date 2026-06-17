// Simulates Koha ILS (Integrated Library System) catalog data.
// In production this would be fetched from the Koha REST API:
//   GET /api/v1/biblios?q=...
//   GET /api/v1/holds (to reserve)

export const BOOKS_CATALOG = [
  { id: 1,  title: 'Dom Casmurro',                author: 'Machado de Assis',      year: 1899, category: 'Literatura Brasileira', available: true,  copies: 3, emoji: '📖', location: 'Biblioteca Municipal Central' },
  { id: 2,  title: 'O Cortiço',                   author: 'Aluísio Azevedo',       year: 1890, category: 'Literatura Brasileira', available: true,  copies: 2, emoji: '📚', location: 'Biblioteca Municipal Central' },
  { id: 3,  title: 'Vidas Secas',                 author: 'Graciliano Ramos',      year: 1938, category: 'Literatura Brasileira', available: false, copies: 0, emoji: '📕', location: 'Biblioteca Setor Norte' },
  { id: 4,  title: 'Grande Sertão: Veredas',      author: 'João Guimarães Rosa',   year: 1956, category: 'Literatura Brasileira', available: true,  copies: 1, emoji: '📗', location: 'Biblioteca Municipal Central' },
  { id: 5,  title: 'Capitães da Areia',           author: 'Jorge Amado',           year: 1937, category: 'Literatura Brasileira', available: true,  copies: 4, emoji: '📘', location: 'Biblioteca Setor Sul' },
  { id: 6,  title: 'Introdução à Computação',     author: 'Forouzan & Mosharraf',  year: 2012, category: 'Tecnologia',            available: true,  copies: 2, emoji: '💻', location: 'Biblioteca IFTM' },
  { id: 7,  title: 'Algoritmos: Teoria e Prática',author: 'Cormen et al.',         year: 2009, category: 'Tecnologia',            available: false, copies: 0, emoji: '🧮', location: 'Biblioteca IFTM' },
  { id: 8,  title: 'Engenharia de Software',      author: 'Roger S. Pressman',     year: 2016, category: 'Tecnologia',            available: true,  copies: 2, emoji: '⚙️', location: 'Biblioteca IFTM' },
  { id: 9,  title: 'História de Ituiutaba',       author: 'Salomão Moraes',        year: 2005, category: 'História Local',        available: true,  copies: 1, emoji: '🏛️', location: 'Biblioteca Municipal Central' },
  { id: 10, title: 'Python para Todos',           author: 'Charles Severance',     year: 2016, category: 'Tecnologia',            available: true,  copies: 3, emoji: '🐍', location: 'Biblioteca IFTM' },
  { id: 11, title: 'O Senhor dos Anéis',          author: 'J.R.R. Tolkien',        year: 1954, category: 'Fantasia',              available: true,  copies: 2, emoji: '🧙', location: 'Biblioteca Municipal Central' },
  { id: 12, title: '1984',                        author: 'George Orwell',         year: 1949, category: 'Ficção Científica',     available: false, copies: 0, emoji: '📓', location: 'Biblioteca Setor Norte' },
]

export function searchBooks({ query = '', category = 'all' }) {
  const q = query.toLowerCase()
  return BOOKS_CATALOG.filter((b) => {
    const matchCategory = category === 'all' || b.category === category
    const matchQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    return matchCategory && matchQuery
  })
}

export function getCategories() {
  return ['all', ...Array.from(new Set(BOOKS_CATALOG.map((b) => b.category)))]
}
