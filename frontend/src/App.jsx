import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiState, setApiState] = useState({ status: 'checking', message: 'Connecting to the API…' })
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    let shouldUpdate = true

    async function fetchApiStatus() {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error(`The API responded with status ${response.status}.`)
        }

        const data = await response.json()
        if (shouldUpdate) {
          setApiState({
            status: data.status === 'ok' ? 'connected' : 'unavailable',
            message: data.status === 'ok' ? 'FastAPI is responding.' : 'The API returned an unexpected response.',
          })
        }
      } catch {
        if (shouldUpdate) {
          setApiState({ status: 'unavailable', message: 'Could not reach FastAPI. Is the backend running?' })
        }
      }
    }

    fetchApiStatus()
    return () => {
      shouldUpdate = false
    }
  }, [requestNumber])

  function checkApi() {
    setApiState({ status: 'checking', message: 'Connecting to the API…' })
    setRequestNumber((currentNumber) => currentNumber + 1)
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Jaarvi home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>jaarvi</span>
        </a>
        <span className="topbar-label">A project in progress</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="eyebrow"><span className="eyebrow-dot" /> LEARNING BY BUILDING</div>
        <h1 id="page-title">Small steps.<br /><span>Real software.</span></h1>
        <p className="hero-copy">
          Jaarvi is a learning project that grows into a useful app, one full-stack feature at a time.
        </p>
        <div className="hero-meta">
          <span className="step-number">01</span>
          <span>API foundations</span>
          <span className="meta-divider" />
          <span>React view + FastAPI backend</span>
        </div>
      </section>

      <section className="connection-card" aria-labelledby="connection-title">
        <div className="card-heading">
          <div>
            <p className="section-kicker">THE FIRST CONNECTION</p>
            <h2 id="connection-title">Frontend ↔ backend</h2>
          </div>
          <span className={`status-pill status-${apiState.status}`} role="status">
            <span className="status-dot" />
            {apiState.status === 'checking' ? 'Checking' : apiState.status === 'connected' ? 'Connected' : 'Offline'}
          </span>
        </div>

        <p className="card-copy">React asks FastAPI for its health status. Redis is not needed for this request.</p>

        <div className="request-row">
          <code><span>GET</span> /api/health</code>
          <button className="refresh-button" onClick={checkApi} disabled={apiState.status === 'checking'}>
            {apiState.status === 'checking' ? 'Checking…' : 'Check again'}
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <p className={`connection-message message-${apiState.status}`}>{apiState.message}</p>
      </section>

      <section className="architecture" aria-label="How the app is organized">
        <div className="architecture-item">
          <span className="architecture-index">01 / VIEW</span>
          <h3>React</h3>
          <p>Renders the page and responds to user actions in the browser.</p>
        </div>
        <div className="architecture-arrow" aria-hidden="true">→</div>
        <div className="architecture-item">
          <span className="architecture-index">02 / API</span>
          <h3>FastAPI</h3>
          <p>Receives HTTP requests, applies backend logic, and returns JSON.</p>
        </div>
        <div className="architecture-arrow future-arrow" aria-hidden="true">→</div>
        <div className="architecture-item future-item">
          <span className="architecture-index">03 / LATER</span>
          <h3>Redis</h3>
          <p>Will store app data when we build the persistence feature.</p>
        </div>
      </section>

      <footer className="footer">
        <span>Built in small, explainable steps.</span>
        <span>FastAPI is listening on port 8000</span>
      </footer>
    </main>
  )
}

export default App
