import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { portfolioConfig } from '../config'

// One small page for any unknown URL, including a bad /projects/<slug>.
export function NotFound({ title = 'Page not found', children }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${title} — ${portfolioConfig.name}`
    return () => {
      document.title = prev
    }
  }, [title])

  return (
    <section className="section wrap not-found">
      <h1 className="section-title">{title}</h1>
      {children || <p>There is nothing at this address.</p>}
      <p>
        <Link to="/">← Back to the start</Link>
      </p>
    </section>
  )
}
