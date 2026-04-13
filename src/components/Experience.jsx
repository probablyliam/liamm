import './Experience.css';
import { portfolioConfig } from '../config';

export function Experience() {
  if (!portfolioConfig.experience || portfolioConfig.experience.length === 0) {
    return null;
  }

  return (
    <section className="experience">
      <div className="experience-container">
        <h2>Experience</h2>
        <div className="experience-list">
          {portfolioConfig.experience.map((job) => (
            <div key={job.id} className="experience-item">
              <div className="experience-header">
                <div className="experience-title-block">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                </div>
                <span className="period">{job.period}</span>
              </div>
              <div className="experience-meta">
                <span>{job.employmentType}</span>
                <span aria-hidden="true">•</span>
                <span>{job.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
