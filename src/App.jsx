import { useState } from 'react'
import VisitantesPage from './visitantes/VisitantesPage'
import AtraccionesPage from './atracciones/AtraccionesPage'
import './App.css'

function App() {
  const [paginaActiva, setPaginaActiva] = useState('visitantes')

  return (
    <div className="app">
      <div className="decoracion decoracion-1">🎈</div>
      <div className="decoracion decoracion-2">⭐</div>
      <div className="decoracion decoracion-3">🎠</div>
      <div className="decoracion decoracion-4">🎡</div>

      <header className="hero">
        <div className="hero-content">
          <span className="hero-emoji">🎪</span>

          <div>
            <p className="hero-small">BIENVENIDO AL</p>
            <h1>Parque de Atracciones</h1>
            <p className="hero-description">
              Administra visitantes y atracciones de una forma fácil y divertida.
            </p>
          </div>
        </div>
      </header>

      <nav className="navigation">
        <button
          type="button"
          className={`navigation-button ${
            paginaActiva === 'visitantes' ? 'active' : ''
          }`}
          onClick={() => setPaginaActiva('visitantes')}
        >
          <span className="nav-icon">👨‍👩‍👧‍👦</span>
          <span>
            <strong>Visitantes</strong>
            <small>Gestionar entradas</small>
          </span>
        </button>

        <button
          type="button"
          className={`navigation-button ${
            paginaActiva === 'atracciones' ? 'active' : ''
          }`}
          onClick={() => setPaginaActiva('atracciones')}
        >
          <span className="nav-icon">🎢</span>
          <span>
            <strong>Atracciones</strong>
            <small>Gestionar juegos</small>
          </span>
        </button>
      </nav>

      <main className="main-content">
        <div className="content-card">
          {paginaActiva === 'visitantes' && <VisitantesPage />}

          {paginaActiva === 'atracciones' && <AtraccionesPage />}
        </div>
      </main>

      <footer className="footer">
        <span>🎟️</span>
        <p>Parque de Atracciones · Sistema de gestión</p>
        <span>🎟️</span>
      </footer>
    </div>
  )
}

export default App