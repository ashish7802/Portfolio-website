import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Database, Box, CheckCircle, 
  Settings, BookOpen, Package, FileCode, Search, 
  Copy, Check, Zap, ShieldCheck, Cpu, ArrowUpRight, Code2
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const AwesomeApiSkills = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('stripe');

  const handleCopy = () => {
    navigator.clipboard.writeText('npx @awesome-api-skills/cli init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ecosystemPackages = [
    { icon: <Terminal size={22} />, title: '@awesome-api-skills/cli', desc: 'Interactive terminal CLI to search, validate, and install skills into local agent directories.' },
    { icon: <Database size={22} />, title: '@awesome-api-skills/registry', desc: 'Federated skill repository containing 100+ verified, machine-readable API context files.' },
    { icon: <CheckCircle size={22} />, title: '@awesome-api-skills/validator', desc: 'Strict JSON-schema & Markdown quality gate checking rules, structure, and link validity.' },
    { icon: <Settings size={22} />, title: '@awesome-api-skills/generator', desc: 'Automated compilation engine bundling raw markdown skills into static search indices.' },
    { icon: <Box size={22} />, title: '@awesome-api-skills/sdk', desc: 'Isomorphic TypeScript library for programmatic interaction with skill schemas and metadata.' },
    { icon: <BookOpen size={22} />, title: '@awesome-api-skills/spec', desc: 'Canonical open specification defining standard metadata frontmatter & instruction rules.' }
  ];

  const skillCategories = [
    { name: 'Payments', count: '15+ Skills', color: '#10B981', examples: ['Stripe', 'PayPal', 'LemonSqueezy', 'Square'] },
    { name: 'Auth & Identity', count: '12+ Skills', color: '#6366F1', examples: ['Clerk', 'Supabase Auth', 'Auth0', 'NextAuth'] },
    { name: 'Database & ORM', count: '20+ Skills', color: '#F59E0B', examples: ['Redis', 'Prisma', 'Drizzle', 'Neon DB'] },
    { name: 'AI & LLM', count: '18+ Skills', color: '#EC4899', examples: ['OpenAI', 'Anthropic', 'Vercel AI SDK', 'Pinecone'] },
    { name: 'Email & Comms', count: '14+ Skills', color: '#3B82F6', examples: ['Resend', 'SendGrid', 'Twilio', 'Postmark'] },
    { name: 'Cloud & DevOps', count: '21+ Skills', color: '#8B5CF6', examples: ['Cloudflare Workers', 'Vercel', 'AWS SDK', 'Docker'] }
  ];

  const benchmarks = {
    stripe: {
      title: 'Stripe Webhook Signature Verification',
      without: 'LLM parses JSON body with express.json() first, destroying raw body buffer and causing StripeSignatureVerificationError.',
      with: 'Mounts express.raw({ type: "application/json" }) on webhook route so stripe.webhooks.constructEvent() verifies cryptographically.'
    },
    clerk: {
      title: 'Clerk Authentication Middleware',
      without: 'Generates deprecated authMiddleware({ publicRoutes }) from v4, causing runtime crashes in Next.js 14/15 App Router.',
      with: 'Uses modern clerkMiddleware() with createRouteMatcher() conforming to Next.js v5+ App Router specs.'
    },
    resend: {
      title: 'Resend Email Batching',
      without: 'Iterates inside a loop with individual send() calls, taking minutes and triggering HTTP 429 rate limit errors.',
      with: 'Packages emails into resend.batch.send([]), dispatching up to 500 emails in a single low-latency HTTP request.'
    }
  };

  return (
    <section id="skills" className="section-container" style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          color: 'var(--accent-primary)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <Zap size={16} /> 100 Verified Machine-Readable SKILL.md Files
        </div>

        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>
          Awesome <span className="gradient-text">API Skills</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Structured, schema-validated context files that teach AI coding agents (Claude Code, Cursor, Codex CLI, Gemini) how to work with real APIs without hallucinated SDK methods or rate limits.
        </p>

        {/* Primary CTA Buttons with Working Links */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/ashish7802/awesome-api-skills" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FaGithub size={18} /> View Repository <ArrowUpRight size={16} />
          </a>
          <a 
            href="https://github.com/ashish7802/awesome-api-skills/tree/main/skills" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Search size={18} /> Browse 100 Skills <ArrowUpRight size={16} />
          </a>
          <a 
            href="https://github.com/ashish7802/awesome-api-skills/blob/main/SPECIFICATION.md" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <BookOpen size={18} /> Specification <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>

      {/* Project Quick Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '5rem' 
        }}
      >
        {[
          { label: '100 Verified Skills', icon: <ShieldCheck size={24} color="var(--accent-primary)" /> },
          { label: 'TypeScript SDK', icon: <FileCode size={24} color="var(--accent-secondary)" /> },
          { label: 'MIT Open Source', icon: <CheckCircle size={24} color="#10B981" /> },
          { label: 'CLI Tooling', icon: <Terminal size={24} color="var(--accent-primary)" /> },
          { label: '6 Core Monorepo Pkgs', icon: <Package size={24} color="var(--accent-secondary)" /> }
        ].map((fact, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            {fact.icon}
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{fact.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Before vs After Benchmark Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              ⚡ The Difference A <span className="gradient-text">Skill</span> Makes
            </h3>
            <a 
              href="https://github.com/ashish7802/awesome-api-skills/blob/main/docs/BENCHMARKS_AND_EXAMPLES.md"
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: 500 }}
            >
              See Code Diffs <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Scenario Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {Object.keys(benchmarks).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  border: activeTab === key ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                  background: activeTab === key ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  color: activeTab === key ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {key.toUpperCase()} Integration
              </button>
            ))}
          </div>

          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {benchmarks[activeTab].title}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Without SKILL.md */}
            <div style={{ 
              padding: '1.2rem', 
              borderRadius: '12px', 
              background: 'rgba(239, 68, 68, 0.08)', 
              border: '1px solid rgba(239, 68, 68, 0.2)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                ❌ Without SKILL.md (LLM Guessing)
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {benchmarks[activeTab].without}
              </p>
            </div>

            {/* With SKILL.md */}
            <div style={{ 
              padding: '1.2rem', 
              borderRadius: '12px', 
              background: 'rgba(16, 185, 129, 0.08)', 
              border: '1px solid rgba(16, 185, 129, 0.2)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 700, marginBottom: '0.5rem' }}>
                ✅ With SKILL.md (Context Injected)
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {benchmarks[activeTab].with}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>
          Skill <span className="gradient-text">Directory Categories</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {skillCategories.map((cat, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</h4>
                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: cat.color, border: `1px solid ${cat.color}40` }}>
                  {cat.count}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {cat.examples.map((item, idx) => (
                  <span key={idx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '6px', color: 'var(--text-secondary)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ecosystem Monorepo Packages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>
          Monorepo <span className="gradient-text">Ecosystem Architecture</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {ecosystemPackages.map((pkg, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
              <div style={{ color: 'var(--accent-primary)' }}>{pkg.icon}</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{pkg.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{pkg.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Installation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '5rem' }}
      >
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quick <span className="gradient-text">Installation</span></h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Initialize skills directly into your workspace with a single command:
          </p>
          <div style={{ 
            background: 'var(--bg-secondary)', 
            padding: '1.2rem 1.5rem', 
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

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a 
              href="https://github.com/ashish7802/awesome-api-skills/blob/main/docs/CLI_USAGE.md" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Read Full CLI Guide <ArrowUpRight size={16} />
            </a>
            <span style={{ color: 'var(--text-secondary)' }}>•</span>
            <a 
              href="https://github.com/ashish7802/awesome-api-skills/blob/main/CONTRIBUTING.md" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              Contribution Guidelines <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}
      >
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
          Elevate Your AI Agents Today
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Explore the open-source repository, read the official specification, or integrate skills into your team's workflow.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/ashish7802/awesome-api-skills" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FaGithub size={18} /> GitHub Repository <ArrowUpRight size={16} />
          </a>
          <a 
            href="https://github.com/ashish7802/awesome-api-skills/tree/main/skills" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Code2 size={18} /> Browse 100 SKILL.md Files <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default AwesomeApiSkills;
