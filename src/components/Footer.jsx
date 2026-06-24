const Footer = () => {
  return (
    <footer style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(5, 5, 5, 0.5)'
    }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Ashish Yadav. Built with React & Framer Motion.
      </p>
    </footer>
  );
};

export default Footer;
