import './Principles.css'
import { portfolioConfig } from '../config'

export function Principles() {
  const { principles } = portfolioConfig
  if (!principles || !principles.items || principles.items.length === 0) return null

  return (
    <section id="principles" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Working Principles</h2>
        </div>
        {principles.intro && <p className="principles-intro">{principles.intro}</p>}
        <div className="principles-grid">
          {principles.items.map((item) => (
            <div key={item.title} className="principle panel">
              <h3 className="principle-title">{item.title}</h3>
              <p className="principle-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
