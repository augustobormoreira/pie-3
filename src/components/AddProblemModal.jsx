import { useState } from 'react'
import { PROBLEM_TYPES, getProblemType } from '../data/problemTypes'
import styles from '../styles/Modal.module.css'

export default function AddProblemModal({ clickData, onConfirm, onCancel }) {
  const [type, setType] = useState('buracos')
  const [description, setDescription] = useState('')
  const [anon, setAnon] = useState(true)

  const pt = getProblemType(type)

  const handleSubmit = () => {
    onConfirm({ type, description, anon, ...clickData })
    setType('buracos')
    setDescription('')
    setAnon(true)
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        <h2 className={styles.title}>Adicionar novo problema</h2>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Endereço{' '}
            <span className={styles.labelNote}>(preenchido automaticamente)</span>
          </label>
          <div className={styles.addrField}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d9e5a" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {clickData?.address}
          </div>
        </div>


        <div className={styles.fieldGroup}>
          <label className={styles.label}>Tipo de problema</label>
          <div className={styles.selectWrap}>
            <span
              className={styles.typeBadge}
              style={{ background: pt.color }}
            >
              {pt.letter}
            </span>
            <select
              className={styles.selectInput}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {PROBLEM_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

    
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Descrição{' '}
            <span className={styles.labelNote}>(opcional)</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Descreva o problema (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

   
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Deseja se identificar?</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioItem}>
              <input
                type="radio"
                checked={!anon}
                onChange={() => setAnon(false)}
              />
              Sim, exibir meu nome
            </label>
            <label className={styles.radioItem}>
              <input
                type="radio"
                checked={anon}
                onChange={() => setAnon(true)}
              />
              Não, manter anônimo
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancelar</button>
          <button className={styles.confirmBtn} onClick={handleSubmit}>Adicionar pin</button>
        </div>
      </div>
    </div>
  )
}
