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

// Ambient clip: muted, looping, no controls — it just plays so the viewer can
// watch the motion. To stay cheap it loads nothing until it scrolls into view
// (preload="none" + an IntersectionObserver that plays/pauses on visibility),
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

// Accurate architecture flow, built from the project's actual systems:
// input → controller (gated by the trial) → data-driven ability → a physics
// branch and a decoupled feedback branch.
function ArchDiagram() {
  return (
    <div className="arch" role="img" aria-label="Architecture: input feeds an ability controller gated by the trial layer; the controller resolves a ScriptableObject ability that splits into a physics service driving destructibles and a feedback bus driving camera and audio.">
      <div className="arch-stage">
        <span className="arch-name">Player input</span>
        <span className="arch-sub">New Input System → ability channel</span>
      </div>
      <div className="arch-arrow" aria-hidden="true">↓</div>

      <div className="arch-gaterow">
        <div className="arch-stage arch-primary">
          <span className="arch-name">Ability controller</span>
          <span className="arch-sub">commit-on-press · Red + Blue → Purple</span>
        </div>
        <div className="arch-gate" aria-hidden="true">
          <span className="arch-gatelabel">gates</span>
          <div className="arch-stage arch-aside">
            <span className="arch-name">Trial layer</span>
            <span className="arch-sub">use limiter · scoring · grade</span>
          </div>
        </div>
      </div>
      <div className="arch-arrow" aria-hidden="true">↓ resolves</div>

      <div className="arch-stage arch-primary">
        <span className="arch-name">Ability — ScriptableObject</span>
        <span className="arch-sub">physics profile + feedback profile</span>
      </div>

      <div className="arch-split">
        <div className="arch-branch">
          <div className="arch-arrow" aria-hidden="true">↓ forces</div>
          <div className="arch-stage">
            <span className="arch-name">Physics service</span>
            <span className="arch-sub">non-alloc · capped · de-duped</span>
          </div>
          <div className="arch-arrow" aria-hidden="true">↓</div>
          <div className="arch-stage">
            <span className="arch-name">Destructibles</span>
            <span className="arch-sub">push · pull · delete → score</span>
          </div>
        </div>
        <div className="arch-branch">
          <div className="arch-arrow" aria-hidden="true">↓ events</div>
          <div className="arch-stage">
            <span className="arch-name">Feedback bus</span>
            <span className="arch-sub">static · decoupled</span>
          </div>
          <div className="arch-arrow" aria-hidden="true">↓</div>
          <div className="arch-stage">
            <span className="arch-name">Presenters</span>
            <span className="arch-sub">camera shake · FOV · audio</span>
          </div>
        </div>
      </div>
    </div>
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

  // Open each project page at the top, not wherever the previous page was.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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
  const stats = project.stats || []
  const features = project.features || []
  const abilities = project.abilities || []
  const build = project.build || []
  const takeaways = project.takeaways || []
  const showcase = project.showcase

  return (
    <article className="detail section">
      <div className="wrap">
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

        {/* HERO — leads with the finished result, then one sentence + 3 stats */}
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

        {tagline && <p className="detail-tagline">{tagline}</p>}

        {stats.length > 0 && (
          <dl className="detail-stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Short overview — the main idea, for anyone who reads on */}
        {project.description && (
          <p className="detail-desc detail-overview">{project.description}</p>
        )}

        {/* WHAT MAKES IT INTERESTING — six scannable cards */}
        {features.length > 0 && (
          <section className="detail-section">
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

        {/* THE THREE ABILITIES — the centerpiece: three equal columns */}
        {abilities.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-h2">The three abilities</h2>
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
                      <span className="abil-name">{a.name}</span>
                    </div>
                    <dl className="abil-kv">
                      {a.purpose && (<><dt>Purpose</dt><dd>{a.purpose}</dd></>)}
                      {a.feels && (<><dt>Feels like</dt><dd>{a.feels}</dd></>)}
                      {a.detail && (<><dt>Detail</dt><dd>{a.detail}</dd></>)}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* HOW IT WAS BUILT — main idea up top, deeper detail in an expander */}
        {build.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-h2">How it was built</h2>
            <div className="build-list">
              {build.map((b, i) => {
                const isDiagram = b.media && b.media.type === 'diagram'
                return (
                  <div key={i} className={`build-row${isDiagram ? ' build-row-wide' : ''}`}>
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
                    {b.media && (
                      <div className="build-media">
                        {isDiagram ? (
                          <ArchDiagram />
                        ) : (
                          <BuildMedia
                            item={b.media}
                            onExpand={
                              b.media.type === 'video' && b.media.src
                                ? () => setLightbox({ src: b.media.src, poster: b.media.poster })
                                : undefined
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* WHAT I LEARNED — a few substantive bullets */}
        {takeaways.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-h2">What I learned</h2>
            <ul className="learn-list">
              {takeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>
        )}
      </div>

      <Lightbox media={lightbox} onClose={() => setLightbox(null)} />
    </article>
  )
}
