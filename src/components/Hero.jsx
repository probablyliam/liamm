import './Hero.css';
import { portfolioConfig } from '../config';

export function Hero() {
  const { social } = portfolioConfig;

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1>{portfolioConfig.name}</h1>
          <p className="subtitle">{portfolioConfig.title}</p>
          <p className="subtext">{portfolioConfig.about}</p>
          <div className="hero-links">
            {social.email && (
              <a href={`mailto:${social.email}`} title="Email">
                <span className="hero-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 2v.2l8 5.3 8-5.3V8l-8 5.2L4 8z" />
                  </svg>
                </span>
                Email
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <span className="hero-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8 10H6V17H8V10M7 6.75A1.25 1.25 0 1 0 7 9.25A1.25 1.25 0 1 0 7 6.75M18 13.5C18 11.57 16.43 10 14.5 10C13.53 10 12.67 10.39 12 11V10H10V17H12V13.5A1.5 1.5 0 0 1 15 13.5V17H18V13.5Z" />
                  </svg>
                </span>
                LinkedIn
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                <span className="hero-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" role="img" focusable="false">
                    <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.56C4 13.93 3.48 13.07 3.32 12.62C3.23 12.39 2.84 11.68 2.5 11.49C2.22 11.34 1.82 10.97 2.49 10.96C3.12 10.95 3.57 11.54 3.72 11.78C4.44 12.99 5.59 12.65 6.05 12.44C6.12 11.92 6.33 11.57 6.56 11.37C4.78 11.17 2.92 10.48 2.92 7.42C2.92 6.55 3.23 5.84 3.74 5.29C3.66 5.09 3.38 4.26 3.82 3.15C3.82 3.15 4.49 2.94 6.02 3.98C6.66 3.8 7.34 3.71 8.02 3.71C8.7 3.71 9.38 3.8 10.02 3.98C11.55 2.93 12.22 3.15 12.22 3.15C12.66 4.26 12.38 5.09 12.3 5.29C12.81 5.84 13.12 6.54 13.12 7.42C13.12 10.49 11.25 11.17 9.47 11.37C9.76 11.62 10.01 12.1 10.01 12.85C10.01 13.92 10 14.79 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
                  </svg>
                </span>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
