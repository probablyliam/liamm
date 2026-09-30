import './Footer.css'
import { portfolioConfig } from '../config'

export function Footer() {
  const { name, social } = portfolioConfig

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
        </div>
        <span className="footer-meta">
          © {new Date().getFullYear()} {name}
        </span>
      </div>
    </footer>
  )
}
