import { motion } from 'framer-motion';

const Blog = () => {
  const posts = [
    {
      title: 'The Future of AI in Lead Generation',
      date: 'June 15, 2026',
      excerpt: 'How quantum-level parallel search is changing the way we find and enrich B2B prospects in modern pipelines.',
      readTime: '5 min read'
    },
    {
      title: 'Building Scalable Backends with FastAPI',
      date: 'May 22, 2026',
      excerpt: 'A deep dive into creating high-performance, asynchronous web APIs using Python and FastAPI for complex applications.',
      readTime: '8 min read'
    },
    {
      title: 'Mastering Modern UI with React & Framer Motion',
      date: 'April 10, 2026',
      excerpt: 'Designing premium, glassmorphism aesthetics and smooth scroll animations to create engaging user experiences.',
      readTime: '6 min read'
    }
  ];

  return (
    <section id="blog" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Latest <span className="gradient-text">Insights</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {posts.map((post, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--accent-primary)'} onMouseOut={e => e.target.style.color='var(--text-primary)'}>
                  {post.title}
                </h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-secondary)' }}>{post.date}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                  {post.readTime}
                </span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Blog;
