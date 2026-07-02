import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Awesome API Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1rem 2rem',
      background: 'rgba(5, 5, 5, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <a href="#hero" style={{ fontSize: '1.5rem', fontWeight: 800, textDecoration: 'none' }} className="gradient-text">
        Ashish.
      </a>

      {/* Desktop Menu */}
      <ul className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <a 
              href={link.href} 
              style={{ transition: 'color 0.3s', fontWeight: 500, fontSize: '0.95rem' }} 
              onMouseOver={e => e.target.style.color = 'var(--accent-primary)'} 
              onMouseOut={e => e.target.style.color = 'var(--text-primary)'}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-toggle"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'none'
        }}
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '100%',
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999
        }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textDecoration: 'none'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
