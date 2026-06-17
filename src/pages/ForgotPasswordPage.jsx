import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import styles from '../styles/Auth.module.css'

export default function ForgotPasswordPage({ onBack, showToast }) {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const { forgotPassword, loading } = useAuth()

  const handleSubmit = async () => {
    if (!email) return
    await forgotPassword(email)
    setSent(true)
    showToast(`Instruções enviadas para ${email}`, 'success')
  }

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>

        <h1 className={styles.title}>Recuperar senha</h1>
        <p className={styles.subtitle}>
          Digite seu e-mail cadastrado que enviaremos as instruções para recuperação de senha.
        </p>

        {!sent ? (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>E-mail</label>
              <div className={styles.inputWrap}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            </div>
            <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar instruções'}
            </button>
          </>
        ) : (
          <div className={styles.successMsg}>
            ✅ Instruções enviadas! Verifique seu e-mail.
          </div>
        )}

        <button className={styles.linkCenter} onClick={onBack}>
          Voltar para o login
        </button>
      </div>
    </div>
  )
}
