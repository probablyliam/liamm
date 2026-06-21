import { Link, useLocation } from 'react-router-dom'
import './Nav.css'
import { portfolioConfig } from '../config'

export function Nav() {
  const { name, social } = portfolioConfig
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Section links jump within the home page; from a detail page they route home.
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`)

  const contactHref = social.email
    ? `mailto:${social.email}`
    : social.linkedin
  // External profile (LinkedIn fallback) opens in a new tab; a mailto: doesn't.
  const contactProps = social.email ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-brand">
          <span className="nav-name">{name}</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <a href={sectionHref('projects')}>Projects</a>
          <a href={sectionHref('experience')}>Experience</a>
          <a href={sectionHref('skills')}>Skills</a>
          <span className="nav-sep" aria-hidden="true" />
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {social.resume && (
            <a href={social.resume} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          )}
          <a href={contactHref} className="nav-contact" {...contactProps}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
