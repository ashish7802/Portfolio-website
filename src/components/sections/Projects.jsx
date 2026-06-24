import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const Projects = () => {
  const projects = [
    {
      title: 'QuantumX AI Search',
      description: 'Quantum-level parallel search AI for accurate, reliable outputs. Built with advanced NLP and vector databases.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'FastAPI', 'React', 'AI'],
      github: '#',
      live: '#'
    },
    {
      title: 'LeadGen Pro Integration',
      description: 'A comprehensive B2B prospect research and lead generation tool that enriches data and cleans email lists automatically.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Data Enrichment', 'Python', 'B2B'],
      github: '#',
      live: '#'
    },
    {
      title: 'Scalable Web Architectures',
      description: 'High-performance, scalable web apps built for modern businesses focusing on speed, reliability, and beautiful UI.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      tags: ['React', 'CSS', 'Responsive Design'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="glass-card"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 600 }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6, flexGrow: 1 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.8rem', 
                      padding: '0.3rem 0.8rem', 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      color: 'var(--accent-primary)',
                      borderRadius: '20px',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={project.github} className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <FiGithub /> Code
                  </a>
                  <a href={project.live} className="btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <FiExternalLink /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
