import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'
import { portfolioConfig } from '../config'

function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src || '')
}

function statusClass(status = '') {
  const s = status.toLowerCase()
  if (s.includes('live') || s.includes('shipped') || s.includes('complete')) return 'is-ok'
  if (s.includes('dev') || s.includes('progress') || s.includes('wip')) return 'is-wip'
  return 'is-idle'
}

function LinkButtons({ links = {}, slug }) {
  const order = [
    ['live', 'Live'],
    ['download', 'Download'],
    ['github', 'Source'],
    ['devlog', 'Devlog'],
  ]
  return (
    <div className="pc-links">
      {order.map(([key, label]) =>
        links[key] ? (
          <a
            key={key}
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            onClick={(e) => e.stopPropagation()}
          >
            {label}
          </a>
        ) : null
      )}
      <Link to={`/projects/${slug}`} className="btn btn-primary">
        Details
      </Link>
    </div>
  )
}

function ProjectCard({ project, featured }) {
  const videoRef = useRef(null)
  const [previewOn, setPreviewOn] = useState(false)
  const hasPreview = isVideo(project.preview)
  const built = Array.isArray(project.built) ? project.built : project.built ? [project.built] : []

  const handleEnter = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    setPreviewOn(true)
    v.play().catch(() => {})
  }
  const handleLeave = () => {
    setPreviewOn(false)
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }
  // When the short preview finishes, fade back to the poster instead of
  // freezing on the last frame. Moving out and back in replays it.
  const handleEnded = () => setPreviewOn(false)

  return (
    <article className={`pc panel${featured ? ' pc-featured' : ''}`}>
      <Link
        to={`/projects/${project.slug}`}
        className="pc-media"
        aria-label={`${project.title} — view details`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {project.cover ? (
          <img className="pc-poster" src={project.cover} alt="" loading="lazy" />
        ) : (
          <div className="pc-noimg">No screenshot yet</div>
        )}
        {hasPreview && (
          <video
            ref={videoRef}
            className={`pc-preview${previewOn ? ' is-visible' : ''}`}
            src={project.preview}
            poster={project.cover || undefined}
            muted
            playsInline
            preload="none"
            onEnded={handleEnded}
          />
        )}
      </Link>

      <div className="pc-body">
        <div className="pc-head">
          <h3 className="pc-title">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <div className="pc-headmeta">
            {project.status && (
              <span className={`status ${statusClass(project.status)}`}>{project.status}</span>
            )}
            {project.year && <span className="pc-year">{project.year}</span>}
          </div>
        </div>

        {project.kind && <p className="pc-kind">{project.kind}</p>}
        {project.summary && <p className="pc-summary">{project.summary}</p>}

        <dl className="pc-spec">
          {project.problem && (
            <>
              <dt>Problem</dt>
              <dd>{project.problem}</dd>
            </>
          )}
          {built.length > 0 && (
            <>
              <dt>What I built</dt>
              <dd>
                {built.length === 1 ? (
                  built[0]
                ) : (
                  <ul className="pc-built">
                    {built.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </dd>
            </>
          )}
          {project.tech && project.tech.length > 0 && (
            <>
              <dt>Tech</dt>
              <dd>
                <div className="tag-row">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </dd>
            </>
          )}
        </dl>

        <LinkButtons links={project.links} slug={project.slug} />
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
        <div className="section-head">
          <h2>Projects</h2>
          <span className="count">{projects.length} total</span>
        </div>
        <div className="pc-grid">
          {ordered.map((p) => (
            <ProjectCard key={p.id} project={p} featured={p === featured} />
          ))}
        </div>
      </div>
    </section>
  )
}
