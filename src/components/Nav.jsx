import { Link, useLocation } from 'react-router-dom'
import './Nav.css'
import { portfolioConfig } from '../config'

export function Nav() {
  const { name, social } = portfolioConfig
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Section links jump within the home page; from a detail page they route home.
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-brand">{name}</Link>

        {/* Section links in the same order as the page itself. */}
        <nav className="nav-links" aria-label="Primary">
          <a href={sectionHref('projects')}>Projects</a>
          <a href={sectionHref('experience')}>Experience</a>
          <a href={sectionHref('skills')}>Skills</a>
          {social.github && (
            <a href={social.github} className="nav-ext" target="_blank" rel="me noopener noreferrer">
              GitHub
            </a>
          )}
          <a href={social.linkedin} className="nav-contact" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
