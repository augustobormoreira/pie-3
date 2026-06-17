import { useEffect } from 'react'
import styles from '../styles/Toast.module.css'

export default function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3500)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className={`${styles.toast} ${styles[type]}`} onClick={onDismiss}>
      <span className={styles.icon}>{type === 'success' ? '✅' : '❌'}</span>
      {message}
    </div>
  )
}
