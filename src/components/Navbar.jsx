

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1rem 2rem',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }} className="gradient-text">
        Ashish.
      </div>
      <ul style={{ display: 'flex', gap: '2rem' }}>
        <li><a href="#about" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>About</a></li>
        <li><a href="#experience" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Experience</a></li>
        <li><a href="#projects" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Projects</a></li>
        <li><a href="#skills" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Awesome API Skills</a></li>
        <li><a href="#contact" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-primary)'}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
