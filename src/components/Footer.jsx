import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        borderTop: '1px solid var(--border)',
        padding: '80px 0 40px',
        background: 'linear-gradient(180deg, transparent, var(--section-alt))',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, var(--primary), var(--accent))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: 'var(--text-on-primary)',
              }}>DI</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
                Drive<span style={{ color: 'var(--primary-light)' }}>Innovate</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              Intelligent fleet management & GPS tracking platform. Real-time monitoring for modern fleets.
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Product', items: [
              { label: 'Features', to: '/features' },
              { label: 'Devices', to: '/devices' },
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Pricing', to: '/pricing' },
            ]},
            { title: 'Resources', items: [
              { label: 'Documentation', to: '#' },
              { label: 'API Reference', to: '#' },
              { label: 'Setup Guide', to: '#' },
              { label: 'Support', to: '/contact' },
            ]},
            { title: 'Company', items: [
              { label: 'About', to: '#' },
              { label: 'Contact', to: '/contact' },
              { label: 'Privacy', to: '#' },
              { label: 'Terms', to: '#' },
            ]},
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(item => (
                  <Link key={item.label} to={item.to} style={{ fontSize: 14, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            © 2026 DriveInnovate. Built with ❤️ for modern fleets.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
              <a key={s} href="#" style={{ fontSize: 13, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
