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
      <div className="wrap intro-inner">
        <div className="intro-main">
          <h1 id="intro-name">{name}</h1>
          <p className="intro-role">{role}</p>
          <p className="intro-text">{intro}</p>
          <div className="intro-actions">
            {social.github && (
              <a className="btn" href={social.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a className="btn" href={social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {social.resume && (
              <a className="btn" href={social.resume} target="_blank" rel="noopener noreferrer">
                Résumé
              </a>
            )}
            <a className="btn btn-primary" href={contactHref} {...contactProps}>
              Contact
            </a>
          </div>
        </div>

        <dl className="intro-facts panel">
          {status && (
            <>
              <dt>Status</dt>
              <dd>{status}</dd>
            </>
          )}
          {location && (
            <>
              <dt>Location</dt>
              <dd>{location}</dd>
            </>
          )}
          <dt>Focus</dt>
          <dd>Security · Backend · APIs</dd>
        </dl>
      </div>
    </section>
  )
}
