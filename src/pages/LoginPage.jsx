import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import styles from '../styles/Auth.module.css'

export default function LoginPage({ onLogin, onGoRegister, onGoForgot }) {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState('')
  const { login, loading }    = useAuth()

  const handleSubmit = async () => {
    setError('')
    try {
      const user = await login(email, password)
      onLogin(user)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>

        <h1 className={styles.title}>Faça seu login</h1>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.fieldGroup}>
          <label className={styles.label}>E-mail</label>
          <div className={styles.inputWrap}>
            <EmailIcon />
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

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Senha</label>
          <div className={styles.inputWrap}>
            <LockIcon />
            <input
              className={styles.input}
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button className={styles.eyeBtn} onClick={() => setShowPass((s) => !s)}>
              {showPass ? '👁' : '👁‍🗨'}
            </button>
          </div>
        </div>

        <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Entrando…' : 'Logar'}
        </button>

        <div className={styles.linkRow}>
          <button className={styles.link} onClick={onGoForgot}>Esqueci minha senha</button>
          <button className={styles.link} onClick={onGoRegister}>Não tenho login</button>
        </div>

        <p className={styles.hint}>
          Demo cidadão: joao@email.com / 123456<br/>
          Demo prefeitura: prefeitura@ituiutaba.mg.gov.br / prefeitura123
        </p>
      </div>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
