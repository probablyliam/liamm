import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'
import { portfolioConfig } from '../config'
import { isVideo, statusClass, usePrefersReducedMotion, useInViewPlayback } from '../media'

const LINK_LABELS = [
  ['live', 'Live'],
  ['download', 'Download'],
  ['github', 'Source'],
  ['devlog', 'Devlog'],
]

// The project's footage, large. The short preview loops while it's on
// screen (so it works on phones, where there is no hover); with reduced
// motion it stays on the still cover.
function ProjectMedia({ project }) {
  const videoRef = useRef(null)
  const reduce = usePrefersReducedMotion()
  const playable = isVideo(project.preview) && !reduce
  useInViewPlayback(videoRef, playable)

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="pj-media"
      aria-label={`${project.title}, view details`}
      tabIndex={-1}
    >
      {playable ? (
        <video
          ref={videoRef}
          src={project.preview}
          poster={project.cover || undefined}
          muted
          loop
          playsInline
          preload="none"
        />
      ) : project.cover ? (
        <img src={project.cover} alt="" loading="lazy" />
      ) : null}
    </Link>
  )
}

function ProjectRow({ project }) {
  const built = Array.isArray(project.built) ? project.built : project.built ? [project.built] : []
  const links = project.links || {}

  return (
    <article className="pj">
      <ProjectMedia project={project} />

      <div className="pj-body">
        <header className="pj-head">
          <h3 className="pj-title">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          {project.kind && <p className="pj-kind">{project.kind}</p>}
          <p className="pj-meta">
            {project.status && (
              <span className={`status ${statusClass(project.status)}`}>{project.status}</span>
            )}
            {project.year && <span>{project.year}</span>}
          </p>
        </header>

        <div className="pj-detail">
          {project.summary && <p className="pj-summary">{project.summary}</p>}
          {project.problem && (
            <div className="pj-block">
              <h4 className="pj-label">Problem</h4>
              <p>{project.problem}</p>
            </div>
          )}
          {built.length > 0 && (
            <div className="pj-block">
              <h4 className="pj-label">What I built</h4>
              {built.length === 1 ? (
                <p>{built[0]}</p>
              ) : (
                <ul className="pj-built">
                  {built.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {project.tech && project.tech.length > 0 && (
            <ul className="tech-list" aria-label="Tech">
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="pj-links">
          <Link to={`/projects/${project.slug}`} className="btn btn-primary">
            Details
          </Link>
          {LINK_LABELS.map(([key, label]) =>
            links[key] ? (
              <a key={key} href={links[key]} target="_blank" rel="noopener noreferrer" className="btn">
                {label}
              </a>
            ) : null
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const { projects } = portfolioConfig
  if (!projects || projects.length === 0) return null

  const featured = projects.find((p) => p.featured)
  const ordered = featured ? [featured, ...projects.filter((p) => p !== featured)] : projects

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2 className="section-title">Projects</h2>
        <div className="pj-list">
          {ordered.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
