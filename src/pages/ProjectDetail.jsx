import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { portfolioConfig } from '../config'
import './ProjectDetail.css'

const LINK_LABELS = {
  live: 'Live site',
  download: 'Download',
  devlog: 'Devlog',
  github: 'Source',
}

function statusClass(status = '') {
  const s = status.toLowerCase()
  if (s.includes('live') || s.includes('shipped') || s.includes('complete')) return 'is-ok'
  if (s.includes('dev') || s.includes('progress') || s.includes('wip') || s.includes('demo')) return 'is-wip'
  return 'is-idle'
}

// Ambient clip: muted, looping, no controls. It just plays so the viewer can
// watch the motion. To stay cheap it loads nothing until it scrolls into view
// (preload="none" plus an IntersectionObserver that plays/pauses on visibility),
// and it honors reduced-motion by showing the poster with manual controls.
function AmbientClip({ src, poster, caption, className = '', onExpand }) {
  const ref = useRef(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(m.matches)
    if (m.matches) return

    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const frame = (
    <div className={`media-frame media-video ${caption ? '' : className}`.trim()}>
      <video
        ref={ref}
        src={src}
        poster={poster || undefined}
        muted
        loop
        playsInline
        preload="none"
        controls={reduce}
      />
      {onExpand && (
        <button type="button" className="clip-expand" aria-label="Expand to full size" onClick={onExpand}>
          <span className="clip-expand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )

  if (caption) {
    return (
      <figure className={`clip-fig ${className}`.trim()}>
        {frame}
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }
  return frame
}

// Full-size overlay: opens a clip at actual size with native controls so the
// viewer can scrub, pause, or fullscreen it. Closes on backdrop click or Esc.
function Lightbox({ media, onClose }) {
  useEffect(() => {
    if (!media) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [media, onClose])

  if (!media) return null
  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>×</button>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <video
          src={media.src}
          poster={media.poster || undefined}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  )
}

// A plain component map: each system and the one thing it does. Reads as
// documentation rather than a boxes-and-arrows diagram.
function ComponentMap({ items }) {
  return (
    <dl className="cmap">
      {items.map((c) => (
        <div className="cmap-row" key={c.name}>
          <dt className="cmap-name">{c.name}</dt>
          <dd className="cmap-role">{c.role}</dd>
        </div>
      ))}
    </dl>
  )
}

// Build-row media: an ambient clip, a still image, or a labelled placeholder.
function BuildMedia({ item, onExpand }) {
  if (!item) return null
  if (item.type === 'video' && item.src) {
    return <AmbientClip src={item.src} poster={item.poster} onExpand={onExpand} />
  }
  if (item.src) {
    return (
      <div className="media-frame">
        <img src={item.src} alt={item.alt || ''} loading="lazy" />
      </div>
    )
  }
  return (
    <div className="media-placeholder">
      <span className="media-placeholder-label">{item.placeholder || 'Media'}</span>
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = portfolioConfig.projects.find((p) => p.slug === slug)
  const [lightbox, setLightbox] = useState(null)
  const [activeId, setActiveId] = useState('')

  // Open each project page at the top, not wherever the previous page was.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const features = project?.features || []
  const abilities = project?.abilities || []
  const build = project?.build || []
  const takeaways = project?.takeaways || []

  // On-this-page nav: only the sections this project actually has.
  const tocItems = [
    project?.description || project?.tagline ? { id: 'overview', label: 'Overview' } : null,
    features.length ? { id: 'highlights', label: 'Highlights' } : null,
    abilities.length ? { id: 'abilities', label: 'Abilities' } : null,
    build.length ? { id: 'build', label: "How it's built" } : null,
    takeaways.length ? { id: 'learned', label: 'What I learned' } : null,
  ].filter(Boolean)
  const showToc = tocItems.length >= 2

  // Highlight the section currently under the top of the viewport. A scroll
  // handler (rather than only an observer) lets us force the last item active
  // once the page is scrolled to the bottom, so short final sections still hit.
  useEffect(() => {
    if (!showToc) return undefined
    const ids = tocItems.map((t) => t.id)
    const onScroll = () => {
      const line = 120
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, showToc])

  if (!project) {
    return (
      <section className="section wrap detail-missing">
        <h1>Project not found</h1>
        <p><Link to="/#projects">← Back to projects</Link></p>
      </section>
    )
  }

  const links = project.links || {}
  const hasLinks = Object.values(links).some(Boolean)
  const tagline = project.tagline || project.summary
  const showcase = project.showcase
  const tech = project.tech || []

  return (
    <article className="detail section">
      <div className="wrap">
        <div className={`detail-layout${showToc ? ' has-toc' : ''}`}>
          <div className="detail-main">
            <p className="detail-back">
              <Link to="/#projects">← Projects</Link>
            </p>

            <header className="detail-head">
              <div className="detail-titleblock">
                <h1>{project.title}</h1>
                <p className="detail-meta">
                  {project.status && (
                    <span className={`status ${statusClass(project.status)}`}>{project.status}</span>
                  )}
                  {project.kind && <span className="detail-kind">{project.kind}</span>}
                  {project.year && <span className="detail-year">{project.year}</span>}
                </p>
              </div>
              {hasLinks && (
                <div className="detail-actions">
                  {Object.entries(links).map(([key, url]) =>
                    url ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${key === 'live' || key === 'download' ? 'btn-primary' : ''}`}
                      >
                        {LINK_LABELS[key] || key}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </header>

            {/* HERO — leads with the finished result */}
            {showcase &&
              (showcase.type === 'video' ? (
                <AmbientClip
                  src={showcase.src}
                  poster={showcase.poster}
                  caption={showcase.caption}
                  className="hero-media"
                  onExpand={() => setLightbox({ src: showcase.src, poster: showcase.poster })}
                />
              ) : showcase.type === 'youtube' ? (
                <figure className="clip-fig hero-media">
                  <div className="media-frame media-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${showcase.id}`}
                      title="Project video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </figure>
              ) : (
                showcase.src && (
                  <figure className="clip-fig hero-media">
                    <div className="media-frame">
                      <img src={showcase.src} alt={showcase.alt || ''} />
                    </div>
                  </figure>
                )
              ))}

            {/* INTRO — one sentence, a short overview, then the toolset */}
            <section id="overview" className="detail-intro">
              {tagline && <p className="detail-tagline">{tagline}</p>}

              {project.description && (
                <p className="detail-desc detail-overview">{project.description}</p>
              )}

              {tech.length > 0 && (
                <div className="detail-tools">
                  <span className="detail-tools-label">Built with</span>
                  <div className="tag-row">
                    {tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              )}
            </section>

            {/* WHAT MAKES IT INTERESTING — six scannable cards */}
            {features.length > 0 && (
              <section id="highlights" className="detail-section">
                <h2 className="detail-h2">What makes it interesting</h2>
                <ul className="hl-grid">
                  {features.map((f, i) => {
                    const h = typeof f === 'string' ? { title: f } : f
                    return (
                      <li key={i} className="hl">
                        <span className="hl-title">{h.title}</span>
                        {h.detail && <span className="hl-detail">{h.detail}</span>}
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}

            {/* CUSTOM ABILITIES — the centerpiece: three colour-coded columns */}
            {abilities.length > 0 && (
              <section id="abilities" className="detail-section">
                <h2 className="detail-h2">Custom abilities</h2>
                <div className="abil-grid">
                  {abilities.map((a) => (
                    <article key={a.name} className="abil panel">
                      {a.video && (
                        <AmbientClip
                          src={a.video}
                          poster={a.poster}
                          className="abil-media"
                          onExpand={() => setLightbox({ src: a.video, poster: a.poster })}
                        />
                      )}
                      <div className="abil-body">
                        <div className="abil-head">
                          {a.color && (
                            <span className="abil-dot" style={{ background: a.color }} aria-hidden="true" />
                          )}
                          <span className="abil-name" style={a.color ? { color: a.color } : undefined}>
                            {a.name}
                          </span>
                        </div>
                        {a.blurb && <p className="abil-blurb">{a.blurb}</p>}
                        <dl className="abil-kv">
                          {a.feels && (<><dt>Feels like</dt><dd>{a.feels}</dd></>)}
                          {a.detail && (<><dt>How it works</dt><dd>{a.detail}</dd></>)}
                        </dl>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* HOW IT WAS BUILT — main idea up top, deeper detail in an expander */}
            {build.length > 0 && (
              <section id="build" className="detail-section">
                <h2 className="detail-h2">How it was built</h2>
                <div className="build-list">
                  {build.map((b, i) => {
                    const wide = !!b.components
                    return (
                      <div key={i} className={`build-row${wide ? ' build-row-wide' : ''}`}>
                        <div className="build-text">
                          <h3 className="build-title">{b.title}</h3>
                          {(Array.isArray(b.body) ? b.body : [b.body]).filter(Boolean).map((p, j) => (
                            <p key={j} className="build-body">{p}</p>
                          ))}
                          {b.details && b.details.length > 0 && (
                            <details className="build-more">
                              <summary>
                                <span className="build-more-toggle">Technical details</span>
                              </summary>
                              <div className="build-more-body">
                                {b.details.map((p, j) => (
                                  <p key={j} className="build-body">{p}</p>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                        {b.components ? (
                          <div className="build-media">
                            <ComponentMap items={b.components} />
                          </div>
                        ) : (
                          b.media && (
                            <div className="build-media">
                              <BuildMedia
                                item={b.media}
                                onExpand={
                                  b.media.type === 'video' && b.media.src
                                    ? () => setLightbox({ src: b.media.src, poster: b.media.poster })
                                    : undefined
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* WHAT I LEARNED — a few substantive bullets */}
            {takeaways.length > 0 && (
              <section id="learned" className="detail-section">
                <h2 className="detail-h2">What I learned</h2>
                <ul className="learn-list">
                  {takeaways.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </section>
            )}
          </div>

          {showToc && (
            <aside className="detail-toc" aria-label="On this page">
              <nav className="detail-toc-nav">
                <span className="detail-toc-label">On this page</span>
                {tocItems.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className={`detail-toc-link${activeId === t.id ? ' is-active' : ''}`}
                    aria-current={activeId === t.id ? 'true' : undefined}
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </div>
      </div>

      <Lightbox media={lightbox} onClose={() => setLightbox(null)} />
    </article>
  )
}
