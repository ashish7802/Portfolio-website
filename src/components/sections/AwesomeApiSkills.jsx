import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Database, Box, CheckCircle, 
  Settings, BookOpen,
  Package, FileCode, Search, Copy, Check
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';

const AwesomeApiSkills = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx @awesome-api-skills/cli init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <Terminal size={24} />, title: 'CLI', desc: 'Robust terminal interface for discovering, validating, and installing skills.' },
    { icon: <Database size={24} />, title: 'Registry', desc: 'Federated architecture supporting official and community skills.' },
    { icon: <CheckCircle size={24} />, title: 'Validator', desc: 'Strict quality gate checking JSON schemas, markdown, and links.' },
    { icon: <Settings size={24} />, title: 'Generator', desc: 'Build pipeline that compiles raw markdown and JSON into search indexes.' },
    { icon: <Box size={24} />, title: 'SDK', desc: 'Isomorphic TypeScript library for interacting with the specification programmatically.' },
    { icon: <BookOpen size={24} />, title: 'Specification', desc: 'The canonical open-source standard for defining an AI-readable API skill.' }
  ];

  return (
    <section id="skills" className="section-container" style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '6rem', marginTop: '2rem' }}
      >
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>
          Awesome <span className="gradient-text">API Skills</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          The world's largest collection of installable AI coding skills for APIs.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/ashish7802/awesome-api-skills" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaGithub size={18} /> View Repository
          </a>
          <a href="https://docs.awesome-api-skills.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} /> Documentation
          </a>
          <a href="https://registry.awesome-api-skills.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} /> Browse Registry
          </a>
        </div>
      </motion.div>

      {/* Project Facts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '6rem' 
        }}
      >
        {[
          { label: 'TypeScript SDK', icon: <FileCode size={24} color="var(--accent-primary)" /> },
          { label: 'MIT License', icon: <CheckCircle size={24} color="var(--accent-secondary)" /> },
          { label: 'CLI Tooling', icon: <Terminal size={24} color="var(--accent-primary)" /> },
          { label: 'Core Packages', icon: <Package size={24} color="var(--accent-secondary)" /> }
        ].map((fact, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            {fact.icon}
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fact.label}</span>
          </div>
        ))}
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '6rem' }}
      >
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>About <span className="gradient-text">Awesome API Skills</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <p>
              LLMs are exceptional at writing code, but they often hallucinate endpoints or use deprecated SDK versions when integrating with complex APIs without up-to-date context.
            </p>
            <p>
              <strong>Awesome API Skills</strong> is an open-source, federated ecosystem of machine-readable API specifications. It transforms standard API documentation into dense, validated Skills that AI agents (like GitHub Copilot, Anthropic Claude, and Google Gemini) can consume instantly.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '6rem' }}
      >
        <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Core <span className="gradient-text">Ecosystem</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map((feature, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
              <div style={{ color: 'var(--accent-primary)' }}>{feature.icon}</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{feature.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Installation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '6rem' }}
      >
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Quick <span className="gradient-text">Install</span></h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Install skills directly into your repository.</p>
          <div style={{ 
            background: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            textAlign: 'left'
          }}>
            <div>
              <span style={{ color: 'var(--accent-secondary)' }}>npx</span> @awesome-api-skills/cli init
            </div>
            <button 
              onClick={handleCopy}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              aria-label="Copy to clipboard"
            >
              {copied ? <Check size={20} color="var(--accent-primary)" /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}
      >
        <h3 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 700 }}>Explore the Project</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/ashish7802/awesome-api-skills" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaGithub size={18} /> View Repository
          </a>
          <a href="https://docs.awesome-api-skills.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} /> Read Documentation
          </a>
          <a href="https://registry.awesome-api-skills.dev" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} /> Browse Registry
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default AwesomeApiSkills;
