import './Skills.css'
import { portfolioConfig } from '../config'

function SkillItem({ item }) {
  const obj = typeof item === 'string' ? { name: item } : item
  return (
    <li className={`skill${obj.pro ? ' is-pro' : ''}`}>
      {obj.pro && <span className="skill-dot" aria-hidden="true" />}
      {obj.name}
      {obj.pro && <span className="sr-only"> (used in production)</span>}
    </li>
  )
}

export function Skills() {
  const { skills, skillsFocus } = portfolioConfig
  if (!skills || skills.length === 0) return null

  const anyPro = skills.some((g) =>
    g.items.some((i) => typeof i === 'object' && i.pro)
  )

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Technical focus</h2>
          {anyPro && (
            <span className="skills-legend">
              <span className="skill-dot" aria-hidden="true" /> used in production
            </span>
          )}
        </div>
        {skillsFocus && <p className="skills-focus">{skillsFocus}</p>}
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.group} className="skill-group panel">
              <h3 className="skill-group-title">{group.group}</h3>
              <ul className="skill-items">
                {group.items.map((item) => (
                  <SkillItem key={typeof item === 'string' ? item : item.name} item={item} />
                ))}
              </ul>
              {group.note && <p className="skill-note">{group.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
