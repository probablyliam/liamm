import './Experience.css'
import { portfolioConfig } from '../config'

// Consecutive roles at the same company become one group, so a promotion
// (co-op, then full-time) reads as a single line of progression.
function groupByCompany(jobs) {
  const groups = []
  for (const job of jobs) {
    const last = groups[groups.length - 1]
    if (last && last.company === job.company) last.roles.push(job)
    else groups.push({ company: job.company, roles: [job] })
  }
  return groups
}

function Org({ name, location, children }) {
  return (
    <li className="xp-org">
      <div className="xp-org-head">
        <h3 className="xp-company">{name}</h3>
        {location && <p className="xp-location">{location}</p>}
      </div>
      <ol className="xp-roles">{children}</ol>
    </li>
  )
}

function Role({ title, type, period, summary }) {
  return (
    <li className="xp-role">
      <div className="xp-role-line">
        <span className="xp-title">{title}</span>
        {type && <span className="xp-type">{type}</span>}
        <span className="xp-period">{period}</span>
      </div>
      {summary && <p className="xp-summary">{summary}</p>}
    </li>
  )
}

export function Experience() {
  const { experience, education } = portfolioConfig
  if (!experience || experience.length === 0) return null

  const groups = groupByCompany(experience)

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <h2 className="section-title">Experience</h2>

        <ol className="xp">
          {groups.map((g) => {
            const places = [...new Set(g.roles.map((r) => r.location).filter(Boolean))]
            return (
              <Org key={g.roles[0].id} name={g.company} location={places.join(' / ')}>
                {g.roles.map((job) => (
                  <Role
                    key={job.id}
                    title={job.title}
                    type={job.employmentType}
                    period={job.period}
                    summary={job.summary}
                  />
                ))}
              </Org>
            )
          })}
        </ol>

        {education && (
          <>
            <h3 className="xp-subhead">Education</h3>
            <ol className="xp">
              <Org name={education.school} location={education.location}>
                <Role
                  title={education.degree}
                  type={education.detail}
                  period={education.period}
                />
              </Org>
            </ol>
          </>
        )}
      </div>
    </section>
  )
}
