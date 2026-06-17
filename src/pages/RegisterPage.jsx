import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import styles from '../styles/Auth.module.css'

export default function RegisterPage({ onBack, onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' })
  const [showPass, setShowPass] = useState([false, false])
  const [error, setError]       = useState('')
  const { register, loading }   = useAuth()

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) {
      return setError('Preencha todos os campos.')
    }
    if (form.password !== form.password2) {
      return setError('As senhas não coincidem.')
    }
    if (form.password.length < 6) {
      return setError('A senha deve ter pelo menos 6 caracteres.')
    }
    try {
      const user = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      onRegister(user)
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleShow = (i) =>
    setShowPass((s) => { const n = [...s]; n[i] = !n[i]; return n })

  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        <h1 className={styles.title}>Criar uma conta</h1>
        <p className={styles.subtitle}>Preencha os dados abaixo para criar seu cadastro.</p>
        {error && <p className={styles.error}>{error}</p>}


        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome completo</label>
          <div className={styles.inputWrap}>
            <PersonIcon />
            <input className={styles.input} type="text" placeholder="Seu nome completo"
              value={form.name} onChange={set('name')} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>E-mail</label>
          <div className={styles.inputWrap}>
            <EmailIcon />
            <input className={styles.input} type="email" placeholder="seu@email.com"
              value={form.email} onChange={set('email')} />
          </div>
        </div>

        {[['password', 'Senha', 0], ['password2', 'Confirmar senha', 1]].map(([key, label, i]) => (
          <div className={styles.fieldGroup} key={key}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrap}>
              <LockIcon />
              <input className={styles.input} type={showPass[i] ? 'text' : 'password'}
                placeholder="••••••••" value={form[key]} onChange={set(key)} />
              <button className={styles.eyeBtn} onClick={() => toggleShow(i)}>
                {showPass[i] ? '👁' : '👁‍🗨'}
              </button>
            </div>
          </div>
        ))}

        <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Criando…' : 'Criar conta'}
        </button>

        <p className={styles.bottomText}>
          Já tem uma conta?{' '}
          <button className={styles.link} onClick={onBack}>Faça login</button>
        </p>
      </div>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
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
