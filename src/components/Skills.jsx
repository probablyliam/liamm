import './Skills.css'
import { portfolioConfig } from '../config'

function SkillItem({ item }) {
  const obj = typeof item === 'string' ? { name: item } : item
  return (
    <li className={obj.pro ? 'is-pro' : undefined}>
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
        <h2 className="section-title">Technical focus</h2>

        <div className="skills-intro">
          {skillsFocus && <p className="skills-focus">{skillsFocus}</p>}
          {anyPro && (
            <p className="skills-legend" aria-hidden="true">
              <span className="skills-mark" /> used in production
            </p>
          )}
        </div>

        <dl className="skills">
          {skills.map((group) => (
            <div key={group.group} className="skills-row">
              <dt className="skills-group">{group.group}</dt>
              <dd>
                <ul className="skills-items">
                  {group.items.map((item) => (
                    <SkillItem key={typeof item === 'string' ? item : item.name} item={item} />
                  ))}
                </ul>
                {group.note && <p className="skills-note">{group.note}</p>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
