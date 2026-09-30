import './Intro.css'
import { portfolioConfig } from '../config'

export function Intro() {
  const { name, role, location, status, intro, social } = portfolioConfig
  const contactHref = social.email ? `mailto:${social.email}` : social.linkedin
  // Open in a new tab only when it's an external profile (LinkedIn fallback);
  // a mailto: should stay in the current tab.
  const contactProps = social.email ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <section className="intro" aria-labelledby="intro-name">
      <div className="wrap">
        <h1 id="intro-name" className="intro-name">{name}</h1>

        <div className="intro-grid">
          <div className="intro-main">
            <p className="intro-role">{role}</p>
            <p className="intro-text">{intro}</p>
          </div>

          <div className="intro-side">
            {status && <p className="intro-status">{status}</p>}
            {location && <p className="intro-location">{location}</p>}
            <div className="intro-actions">
              <a className="btn btn-primary" href={contactHref} {...contactProps}>
                Contact
              </a>
              {/* Contact already opens LinkedIn unless an email is set. */}
              {social.email && social.linkedin && (
                <a className="btn" href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {social.github && (
                <a className="btn" href={social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {social.resume && (
                <a className="btn" href={social.resume} target="_blank" rel="noopener noreferrer">
                  Résumé
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
