import { useState } from 'react'
import styles from '../styles/Navbar.module.css'

const TABS = [
  { key: 'map',     label: '🗺️ Mapa' },
  { key: 'library', label: '📚 Biblioteca' },
]

export default function Navbar({ user, onLogout, currentTab, setCurrentTab, showTabs }) {
  const [dropOpen, setDropOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoAccent}>!</span>tuiumapa
      </div>

      {showTabs && (
        <div className={styles.tabs}>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.tab} ${currentTab === key ? styles.tabActive : ''}`}
              onClick={() => setCurrentTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.right}>
        {user ? (
          <div className={styles.userWrap}>
            <button
              className={styles.userBtn}
              onClick={() => setDropOpen((o) => !o)}
            >
              <span className={styles.welcome}>Bem vindo,</span>
              <span className={styles.userName}>
                {user.name.split(' ').slice(0, 2).join(' ')}
              </span>
              <div className={styles.avatar}>{user.name[0]}</div>
              <span className={styles.caret}>▾</span>
            </button>

            {dropOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropItem}>
                  <span>👤</span> {user.name}
                </div>
                <div className={styles.dropItem}>
                  <span>✉️</span> {user.email}
                </div>
                <div className={styles.dropSep} />
                <button
                  className={`${styles.dropItem} ${styles.dropDanger}`}
                  onClick={() => { setDropOpen(false); onLogout() }}
                >
                  <span>🚪</span> Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className={styles.guestText}>Bem vindo, faça seu login</span>
        )}
      </div>
    </nav>
  )
}
