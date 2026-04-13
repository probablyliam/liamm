import { useState } from 'react';
import './Projects.css';
import { portfolioConfig } from '../config';

function ProjectCard({ project }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTiltY = 2.6;
    const maxTiltX = 2.6;

    const rotationX = ((y - centerY) / centerY) * maxTiltX;
    const rotationY = ((centerX - x) / centerX) * maxTiltY;

    setRotation({ x: rotationX, y: rotationY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card-link"
    >
      <div
        className={`project-card ${isHovering ? 'hovering' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
        style={{
          transform: `perspective(1400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          '--glare-x': `${glare.x}%`,
          '--glare-y': `${glare.y}%`,
        }}
      >
        {project.image && (
          <div className="project-image">
            <img src={project.image} alt={project.title} />
            <div className="image-overlay"></div>
          </div>
        )}
        <div className="project-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="project-arrow">→</div>
        </div>
      </div>
    </a>
  );
}

export function Projects() {
  if (!portfolioConfig.projects || portfolioConfig.projects.length === 0) {
    return null;
  }

  return (
    <section className="projects">
      <div className="projects-container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {portfolioConfig.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
