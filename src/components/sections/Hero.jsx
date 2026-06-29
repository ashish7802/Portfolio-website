import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="hero" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', zIndex: 1, maxWidth: '800px' }}
      >
        <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Ashish Yadav
        </h2>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Full Stack Developer & <span className="gradient-text">AI Builder</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Building high-performance, scalable web apps for modern businesses. Web Dev priority + Lead Gen integration.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="#projects" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            View Work <FiArrowRight />
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', fontSize: '1.5rem' }}>
          <a href="https://www.linkedin.com/in/ashish-yadav-ab206124a" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}><FiLinkedin /></a>
          <a href="mailto:ashishyadav4818@gmail.com" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}><FiMail /></a>
          <a href="https://github.com/ashish7802" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--text-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}><FiGithub /></a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
