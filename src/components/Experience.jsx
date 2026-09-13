import './Experience.css'
import { portfolioConfig } from '../config'

export function Experience() {
  const { experience, education } = portfolioConfig
  if (!experience || experience.length === 0) return null

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Experience</h2>
          <span className="count">{experience.length} roles</span>
        </div>

        <div className="exp-table-wrap panel">
          <table className="exp-table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Company</th>
                <th scope="col">Type</th>
                <th scope="col">Period</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            {/* One <tbody> per role so a summary row stays grouped with its
                header row (and hovers as one unit). */}
            {experience.map((job) => {
              const highlights = job.highlights || []
              const hasDetail = !!job.summary || highlights.length > 0
              return (
                <tbody key={job.id} className="exp-job">
                  <tr className={hasDetail ? 'has-detail' : undefined}>
                    <td data-label="Role" className="exp-role">{job.title}</td>
                    <td data-label="Company">{job.company}</td>
                    <td data-label="Type">{job.employmentType}</td>
                    <td data-label="Period" className="exp-period">{job.period}</td>
                    <td data-label="Location">{job.location}</td>
                  </tr>
                  {hasDetail && (
                    <tr className="exp-detail-row">
                      <td colSpan={5}>
                        {job.summary && <p className="exp-summary">{job.summary}</p>}
                        {highlights.length > 0 && (
                          <details className="disclosure exp-more">
                            <summary>{highlights.length} highlights</summary>
                            <ul className="disclosure-body exp-highlights">
                              {highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              )
            })}
          </table>
        </div>

        {education && (
          <div className="exp-edu panel">
            <h3 className="exp-edu-label">Education</h3>
            <p className="exp-edu-line">
              <strong>{education.school}</strong> — {education.degree}
              {education.detail ? ` (${education.detail})` : ''}
            </p>
            <p className="exp-edu-meta">
              {education.period} · {education.location}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
