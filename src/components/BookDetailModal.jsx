import styles from '../styles/Modal.module.css'
import libStyles from '../styles/Library.module.css'

export default function BookDetailModal({ book, onClose, onReserve }) {
  if (!book) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} style={{ maxWidth: 480 }}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={libStyles.detailHeader}>
          <div className={libStyles.detailEmoji}>{book.emoji}</div>
          <div>
            <h2 className={libStyles.detailTitle}>{book.title}</h2>
            <p className={libStyles.detailAuthor}>{book.author}</p>
            <p className={libStyles.detailYear}>Publicado em {book.year}</p>
          </div>
        </div>

        <div className={libStyles.detailInfo}>
          {[
            ['Categoria',    book.category],
            ['Localização',  book.location],
            ['Exemplares',   book.available ? `${book.copies} disponível(is)` : 'Todos emprestados'],
          ].map(([k, v]) => (
            <div key={k} className={libStyles.detailRow}>
              <span className={libStyles.detailKey}>{k}</span>
              <span
                className={libStyles.detailVal}
                style={{ color: k === 'Exemplares' && !book.available ? 'var(--red)' : undefined }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Fechar</button>
          <button
            className={styles.confirmBtn}
            style={!book.available ? { background: '#ccc', cursor: 'not-allowed' } : undefined}
            onClick={() => book.available && onReserve(book)}
          >
            {book.available ? '📌 Reservar' : 'Indisponível'}
          </button>
        </div>
      </div>
    </div>
  )
}
