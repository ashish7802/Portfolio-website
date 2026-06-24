import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="section-container" style={{ marginBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              I'm always open to discussing freelance work, AI integrations, or new web development opportunities. Let's build something amazing together.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '50%', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}>
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Email</h4>
                  <a href="mailto:ashishyadav4818@gmail.com" style={{ fontWeight: 500, transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--accent-primary)'} onMouseOut={e=>e.target.style.color='var(--text-primary)'}>
                    ashishyadav4818@gmail.com
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '50%', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}>
                  <FiPhone size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Phone</h4>
                  <a href="tel:9794918800" style={{ fontWeight: 500, transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--accent-primary)'} onMouseOut={e=>e.target.style.color='var(--text-primary)'}>
                    +91 9794918800
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '50%', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}>
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Location</h4>
                  <span style={{ fontWeight: 500 }}>Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</label>
                <input type="text" id="name" placeholder="John Doe" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }} onFocus={e => e.target.style.borderColor='var(--accent-primary)'} onBlur={e => e.target.style.borderColor='var(--glass-border)'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
                <input type="email" id="email" placeholder="john@example.com" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }} onFocus={e => e.target.style.borderColor='var(--accent-primary)'} onBlur={e => e.target.style.borderColor='var(--glass-border)'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Message</label>
                <textarea id="message" rows="4" placeholder="How can I help you?" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical' }} onFocus={e => e.target.style.borderColor='var(--accent-primary)'} onBlur={e => e.target.style.borderColor='var(--glass-border)'}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                Send Message <FiSend />
              </button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
