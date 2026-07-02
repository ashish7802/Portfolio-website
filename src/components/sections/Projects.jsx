import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFolder, FiStar } from 'react-icons/fi';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'Awesome API Skills Ecosystem',
      category: 'AI & Agents',
      description: 'Production-ready AI coding skills for APIs. Federated monorepo and CLI serving 100 verified SKILL.md context files to prevent LLM API hallucinations.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
      tags: ['TypeScript', 'Node.js CLI', 'AI Agent Context', 'Monorepo'],
      github: 'https://github.com/ashish7802/awesome-api-skills',
      live: 'https://github.com/ashish7802/awesome-api-skills/tree/main/skills',
      featured: true
    },
    {
      title: 'DesiClient Hunter AI',
      category: 'AI & Agents',
      description: 'AI-powered freelance lead hunter that scrapes, filters, and scores high-quality client leads from multiple platforms automatically.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'AI Lead Scoring', 'Web Scraping', 'Automation'],
      github: 'https://github.com/ashish7802/desiclient-hunter',
      live: 'https://github.com/ashish7802/desiclient-hunter',
      featured: true
    },
    {
      title: 'Stealth Web Agent',
      category: 'AI & Agents',
      description: 'Autonomous, production-grade AI Web Agent built with Python, Playwright, and Groq LLM that automates web tasks silently and intelligently.',
      image: '/images/stealth_web_agent.jpg',
      tags: ['Python', 'Playwright', 'Groq LLM', 'Web Agent'],
      github: 'https://github.com/ashish7802/Stealth-Web-Agent',
      live: 'https://github.com/ashish7802/Stealth-Web-Agent',
      featured: true
    },
    {
      title: 'Gravity Shop 3D E-Commerce',
      category: 'Full Stack & 3D',
      description: 'Production-grade 3D e-commerce platform built with Next.js, Three.js, Stripe payment processing, and MongoDB database.',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop',
      tags: ['Next.js', 'Three.js', 'Stripe', 'MongoDB'],
      github: 'https://github.com/ashish7802/Gravity-Shop',
      live: 'https://github.com/ashish7802/Gravity-Shop',
      featured: true
    },
    {
      title: 'Smart Env Vault',
      category: 'Dev Tools & Security',
      description: 'Secure .env environment variable management for devs & teams featuring interactive CLI, Web UI, and automated secret scanner.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
      tags: ['Security', 'CLI Tool', 'React', 'Secret Scanner'],
      github: 'https://github.com/ashish7802/smart-env-vault',
      live: 'https://github.com/ashish7802/smart-env-vault',
      featured: false
    },
    {
      title: 'DevPulse AI GitHub Analyzer',
      category: 'AI & Agents',
      description: 'AI-powered GitHub profile analyzer generating developer insights, commit streak analysis, and actionable AI improvement recommendations.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
      tags: ['Python', 'Gemini AI', 'GitHub API', 'Analytics'],
      github: 'https://github.com/ashish7802/DevPulse-AI',
      live: 'https://github.com/ashish7802/DevPulse-AI',
      featured: false
    },
    {
      title: 'AI Finance Tracker',
      category: 'Full Stack & 3D',
      description: 'Full-stack AI-powered personal finance tracker built with Python FastAPI backend, JWT authentication, and AI financial advisory.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
      tags: ['FastAPI', 'Python', 'React', 'JWT Auth'],
      github: 'https://github.com/ashish7802/finance-tracker-ai',
      live: 'https://github.com/ashish7802/finance-tracker-ai',
      featured: false
    },
    {
      title: 'Roast My Code AI',
      category: 'Dev Tools & Security',
      description: 'Developer tool built with FastAPI and Gemini AI. Paste your code snippet and receive humorous, brutal, yet insightful AI feedback.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop',
      tags: ['FastAPI', 'Gemini AI', 'JavaScript', 'Developer Tool'],
      github: 'https://github.com/ashish7802/roast-my-code',
      live: 'https://github.com/ashish7802/roast-my-code',
      featured: false
    }
  ];

  const categories = ['All', 'AI & Agents', 'Full Stack & 3D', 'Dev Tools & Security'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Real open-source projects, AI agents, and developer tools built by Ashish Yadav.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '20px',
                  border: activeFilter === cat ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                  background: activeFilter === cat ? 'rgba(59, 130, 246, 0.15)' : 'var(--glass-bg)',
                  color: activeFilter === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="glass-card"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {project.featured && (
                <div style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  right: '12px', 
                  background: 'rgba(59, 130, 246, 0.9)', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  zIndex: 2
                }}>
                  <FiStar size={12} /> Featured
                </div>
              )}

              <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6, flexGrow: 1, fontSize: '0.95rem' }}>
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
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary" 
                    style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}
                  >
                    <FiGithub /> GitHub Code
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary" 
                    style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', flex: 1, justifyContent: 'center' }}
                  >
                    <FiExternalLink /> View Repo
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
