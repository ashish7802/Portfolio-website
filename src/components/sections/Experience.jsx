import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">My <span className="gradient-text">Experience</span></h2>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.8rem', background: 'var(--glass-bg)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <FiBriefcase size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Data Research Analyst</h3>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>TaskMinions · Lucknow</h4>
              </div>
            </div>
            
            <p style={{ color: 'var(--accent-secondary)', marginBottom: '1.5rem', fontWeight: 500 }}>
              March 2024 - Present
            </p>
            
            <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>Conduct B2B prospect research and lead generation for client sales pipelines</li>
              <li>Data enrichment and verification using industry-standard tools</li>
              <li>Email list cleaning and prospect data management</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
