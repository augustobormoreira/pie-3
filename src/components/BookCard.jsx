import styles from '../styles/Library.module.css'

export default function BookCard({ book, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(book)}>
      <div className={styles.cover}>{book.emoji}</div>
      <div className={styles.cardTitle}>{book.title}</div>
      <div className={styles.cardAuthor}>{book.author} · {book.year}</div>
      <div className={styles.cardMeta}>
        <span className={styles.categoryTag}>{book.category}</span>
        <span className={`${styles.availBadge} ${book.available ? styles.availYes : styles.availNo}`}>
          {book.available ? `✓ Disponível (${book.copies})` : '✗ Indisponível'}
        </span>
      </div>
    </div>
  )
}
