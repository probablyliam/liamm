import './Intro.css'
import { portfolioConfig } from '../config'

export function Intro() {
  const { name, role, location, status, intro, social } = portfolioConfig

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
              {/* Contact goes through LinkedIn. */}
              <a className="btn btn-primary" href={social.linkedin} target="_blank" rel="noopener noreferrer">
                Contact
              </a>
              {social.github && (
                <a className="btn" href={social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
