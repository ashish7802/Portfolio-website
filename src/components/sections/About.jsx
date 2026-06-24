import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiSmartphone } from 'react-icons/fi';

const About = () => {
  const skills = [
    { name: 'Python (Programming Language)', icon: <FiCode /> },
    { name: 'Cascading Style Sheets (CSS)', icon: <FiLayout /> },
    { name: 'Responsive Web Design', icon: <FiSmartphone /> },
    { name: 'FastAPI', icon: <FiCode /> },
    { name: 'React', icon: <FiLayout /> }
  ];

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Summary</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Full-Stack Web Developer Building QuantumX—AI with quantum-level parallel search for accurate, reliable outputs. I specialize in building high-performance, scalable web apps for modern businesses with a priority on web development and lead generation integration.
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>Education</h3>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Maharana Pratap Group of Institutions</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Bachelor of Technology, AI/ML</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(June 2026)</p>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Top Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)'
                }}>
                  <div style={{ color: 'var(--accent-secondary)', fontSize: '1.2rem' }}>{skill.icon}</div>
                  <span style={{ fontWeight: 500 }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
