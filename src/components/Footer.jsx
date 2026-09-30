import './Footer.css'
import { portfolioConfig } from '../config'

export function Footer() {
  const { name, social } = portfolioConfig
  const contactHref = social.email ? `mailto:${social.email}` : social.linkedin
  // External profile (LinkedIn fallback) opens in a new tab; a mailto: doesn't.
  const contactProps = social.email ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-links">
          {social.github && (
            <a href={social.github} target="_blank" rel="me noopener noreferrer">GitHub</a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="me noopener noreferrer">LinkedIn</a>
          )}
          {social.resume && (
            <a href={social.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
          )}
          {/* Without an email, Contact would just repeat the LinkedIn link. */}
          {social.email && <a href={contactHref} {...contactProps}>Contact</a>}
        </div>
        <span className="footer-meta">
          © {new Date().getFullYear()} {name}
        </span>
      </div>
    </footer>
  )
}
