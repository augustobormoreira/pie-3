import { useState } from 'react'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import MapPage from './pages/MapPage'
import LibraryPage from './pages/LibraryPage'
import { useProblems } from './hooks/useProblems'
import { useToast } from './hooks/useToast'

export default function App() {
  const [page, setPage] = useState('login')   // 'login' | 'register' | 'forgot' | 'main'
  const [tab, setTab] = useState('map')        // 'map' | 'library'
  const [user, setUser] = useState(null)

  const { problems, addProblem } = useProblems()
  const { toast, showToast, clearToast } = useToast()

  const handleLogin = (u) => {
    setUser(u)
    setPage('main')
  }

  const handleLogout = () => {
    setUser(null)
    setPage('login')
    setTab('map')
  }

  const handleRegister = (u) => {
    setUser(u)
    setPage('main')
    showToast(`Bem-vindo, ${u.name.split(' ')[0]}! Conta criada com sucesso.`, 'success')
  }

  return (
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentTab={tab}
        setCurrentTab={setTab}
        showTabs={page === 'main'}
      />

      {page === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onGoRegister={() => setPage('register')}
          onGoForgot={() => setPage('forgot')}
        />
      )}

      {page === 'register' && (
        <RegisterPage
          onBack={() => setPage('login')}
          onRegister={handleRegister}
        />
      )}

      {page === 'forgot' && (
        <ForgotPasswordPage
          onBack={() => setPage('login')}
          showToast={showToast}
        />
      )}

      {page === 'main' && tab === 'map' && (
        <MapPage
          user={user}
          problems={problems}
          onAddProblem={addProblem}
          showToast={showToast}
        />
      )}

      {page === 'main' && tab === 'library' && (
        <LibraryPage showToast={showToast} />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={clearToast}
        />
      )}

      <footer style={{
        position: 'fixed', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        fontSize: 11, color: '#999', zIndex: 50, pointerEvents: 'none'
      }}>
        iftm, 2026
      </footer>
    </>
  )
}
