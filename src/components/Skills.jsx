import './Skills.css';
import { portfolioConfig } from '../config';

export function Skills() {
  if (!portfolioConfig.skills || portfolioConfig.skills.length === 0) {
    return null;
  }

  return (
    <section className="skills">
      <div className="container">
        <h2>Skills & Tech</h2>
        <div className="skills-list">
          {portfolioConfig.skills.map((skill) => (
            <span key={skill} className="skill-item">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
