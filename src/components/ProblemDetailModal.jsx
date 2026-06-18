import { useState, useEffect } from 'react'
import StatusIcon from './StatusIcon'
import { getProblemType } from '../data/problemTypes'
import { getStatus, getStatusList } from '../data/problemStatus'
import { getUserById } from '../data/users'
import modalStyles from '../styles/Modal.module.css'
import styles from '../styles/ProblemDetail.module.css'

const STATUS_LIST = getStatusList()

export default function ProblemDetailModal({ problem, currentUser, onClose, onUpdateStatus }) {
  const [draftStatus, setDraftStatus] = useState(problem?.status)
  const [draftNote, setDraftNote] = useState(problem?.statusNote || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraftStatus(problem?.status)
    setDraftNote(problem?.statusNote || '')
  }, [problem?.id])

  if (!problem) return null

  const pt = getProblemType(problem.type)
  const currentStatus = getStatus(problem.status)
  const isPrefeitura = currentUser?.role === 'prefeitura'
  const reporter = problem.anon ? 'Anônimo' : (getUserById(problem.userId)?.name ?? 'Desconhecido')

  const hasChanges =
    draftStatus !== problem.status || draftNote !== (problem.statusNote || '')

  const handleSave = async () => {
    setSaving(true)
    await onUpdateStatus(problem.id, draftStatus, draftNote)
    setSaving(false)
  }

  return (
    <div className={modalStyles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={modalStyles.modal} style={{ maxWidth: 480 }}>
        <button className={modalStyles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <div className={styles.typeRow}>
            <span className={styles.typeBadge} style={{ background: pt.color }}>{pt.letter}</span>
            <span className={styles.typeLabel}>{pt.label}</span>
          </div>
          <span
            className={styles.statusPill}
            style={{ background: `${currentStatus.color}1a`, color: currentStatus.color }}
          >
            <StatusIcon status={currentStatus.id} size={16} />
            {currentStatus.label}
          </span>
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.infoLabel}>Endereço</div>
          <div className={styles.infoText}>📍 {problem.address}</div>
        </div>

        {problem.description && (
          <div className={styles.infoBlock}>
            <div className={styles.infoLabel}>Descrição do cidadão</div>
            <div className={styles.infoText}>{problem.description}</div>
          </div>
        )}

        <div className={styles.metaRow}>
          <span>Reportado por: <strong>{reporter}</strong></span>
          <span>{problem.date}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.infoBlock}>
          <div className={styles.infoLabel}>Resposta da Prefeitura</div>
          {problem.statusNote ? (
            <div className={styles.responseBox}>
              <div className={styles.responseLabel}>
                <StatusIcon status={problem.status} size={14} /> {currentStatus.label}
              </div>
              <div className={styles.responseText}>{problem.statusNote}</div>
              {problem.statusUpdatedAt && (
                <div className={styles.responseDate}>Atualizado em {problem.statusUpdatedAt}</div>
              )}
            </div>
          ) : (
            <p className={styles.emptyResponse}>A prefeitura ainda não respondeu este chamado.</p>
          )}
        </div>

        {isPrefeitura && (
          <>
            <div className={styles.divider} />
            <div className={styles.adminPanel}>
              <div className={styles.adminTitle}>🏛️ Painel da Prefeitura</div>

              <div className={styles.statusOptions}>
                {STATUS_LIST.map((s) => (
                  <button
                    key={s.id}
                    className={`${styles.statusOption} ${draftStatus === s.id ? styles.statusOptionActive : ''}`}
                    style={{ color: s.color }}
                    onClick={() => setDraftStatus(s.id)}
                  >
                    <StatusIcon status={s.id} size={16} />
                    {s.label}
                  </button>
                ))}
              </div>

              <label className={styles.noteLabel}>Nota de resposta ao cidadão</label>
              <textarea
                className={styles.noteTextarea}
                placeholder="Ex: Piscina esvaziada e esterilizada contra larvas."
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
              />

              <button
                className={styles.saveBtn}
                disabled={!hasChanges || saving}
                onClick={handleSave}
              >
                {saving ? 'Salvando…' : 'Salvar atualização'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
