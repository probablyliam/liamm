import './Skills.css'
import { portfolioConfig } from '../config'

export function Skills() {
  const { skills, skillsFocus } = portfolioConfig
  if (!skills || skills.length === 0) return null

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <h2 className="section-title">Technical focus</h2>

        {skillsFocus && <p className="skills-focus">{skillsFocus}</p>}

        <dl className="skills">
          {skills.map((group) => (
            <div key={group.group} className="skills-row">
              <dt className="skills-group">{group.group}</dt>
              <dd>
                <ul className="skills-items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
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
