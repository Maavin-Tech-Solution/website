import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn, GlowOrb, SectionHeading } from '../components/Animations';
import { HiMail, HiPhone, HiLocationMarker, HiChat, HiPaperAirplane } from 'react-icons/hi';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', fleet: '', device: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'var(--input-bg)',
    color: 'var(--input-text)',
    fontSize: 14,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  return (
    <main style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingBottom: 20 }}>
        <GlowOrb size={500} color="#10b981" x="40%" y="15%" opacity={0.06} />
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              <HiChat /> Get in Touch
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Let's <span className="gradient-text">Talk Fleet</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
              Have questions or need a custom integration? Our team is ready to help you get started.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'start' }}>
            {/* Form */}
            <FadeIn>
              <div style={{
                background: 'var(--bg-card)', borderRadius: 24, padding: 36,
                border: '1px solid var(--border)',
              }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '60px 0' }}
                  >
                    <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>We'll get back to you within 24 hours.</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', fleet: '', device: '', message: '' }); }}
                      style={{
                        marginTop: 24, padding: '10px 28px', borderRadius: 10,
                        border: '1px solid var(--border)', background: 'transparent',
                        color: 'var(--text)', fontWeight: 600, cursor: 'pointer', fontSize: 14,
                        fontFamily: 'var(--font-display)',
                      }}
                    >Send Another</motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Send us a message</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                        <input
                          required name="name" value={form.name} onChange={handleChange}
                          placeholder="Your name" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email *</label>
                        <input
                          required type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="Enter your email" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Company</label>
                        <input
                          name="company" value={form.company} onChange={handleChange}
                          placeholder="Acme Logistics" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Fleet Size</label>
                        <select name="fleet" value={form.fleet} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option value="">Select size</option>
                          <option value="1-10">1 – 10 vehicles</option>
                          <option value="11-50">11 – 50 vehicles</option>
                          <option value="51-200">51 – 200 vehicles</option>
                          <option value="200+">200+ vehicles</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Device Type</label>
                      <select name="device" value={form.device} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select device</option>
                        <option value="GT06">GT06 / GT06N</option>
                        <option value="FMB125">FMB125 (Teltonika)</option>
                        <option value="FMB920">FMB920 (Teltonika)</option>
                        <option value="FMB130">FMB130 (Teltonika)</option>
                        <option value="WeTrack2">WeTrack 2</option>
                        <option value="TK103">TK103</option>
                        <option value="Other">Other / Custom</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Message *</label>
                      <textarea
                        required name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell us about your fleet management needs..."
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      style={{
                        width: '100%', padding: '14px 0',
                        borderRadius: 12, border: 'none',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        color: 'var(--text-on-primary)', fontWeight: 700, fontSize: 15,
                        cursor: 'pointer', fontFamily: 'var(--font-display)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}
                    >
                      <HiPaperAirplane size={18} /> Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Info sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: <HiMail size={22} />, label: 'Email', value: 'support@driveinnovate.in', color: '#3b82f6' },
                { icon: <HiPhone size={22} />, label: 'Phone', value: '+91 93154 89988', color: '#10b981' },
                { icon: <HiLocationMarker size={22} />, label: 'Office', value: 'A-15, Sector-69, Noida, Uttar Pradesh, India', color: '#8b5cf6' },
              ].map((c, i) => (
                <ScaleIn key={i} delay={i * 0.1}>
                  <div style={{
                    background: 'var(--bg-card)', borderRadius: 16, padding: 24,
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 16,
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: c.color + '15', color: c.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{c.value}</div>
                    </div>
                  </div>
                </ScaleIn>
              ))}

              {/* Why DriveInnovate */}
              <ScaleIn delay={0.3}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.08))',
                  borderRadius: 16, padding: 24,
                  border: '1px solid rgba(59,130,246,0.2)',
                }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Why DriveInnovate?</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      'Multi-protocol support (GT06 + Teltonika)',
                      'Real-time WebSocket updates',
                      'Self-hosted option available',
                      'Indian market focused',
                      'Active development & support',
                    ].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                        <span style={{ color: '#10b981' }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 768px) {
          main section .container > div[style*="grid-template-columns: 1fr 400px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
