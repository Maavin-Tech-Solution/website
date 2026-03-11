import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, staggerItem, Float, GlowOrb, CountUp, SectionHeading } from '../components/Animations';
import { HiLocationMarker, HiTruck, HiChartBar, HiShieldCheck, HiLightningBolt, HiBell, HiClock, HiDocumentReport, HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

/* ── All app screenshots for lightbox ── */
const allScreenshots = [
  { src: '/dashbaord/dashboard.png', label: 'Dashboard Overview', badge: 'Home', color: '#10b981' },
  { src: '/dashbaord/fleet.png', label: 'Fleet Management', badge: 'Fleet', color: '#8b5cf6' },
  { src: '/dashbaord/reports.png', label: 'Reports & Analytics', badge: 'Reports', color: '#f59e0b' },
  { src: '/dashbaord/login.png', label: 'Secure Login', badge: 'Auth', color: '#3b82f6' },
  { src: '/dashbaord/vehicle details.png', label: 'Vehicle Details', badge: 'Detail', color: '#06b6d4' },
  { src: '/dashbaord/report-data.png', label: 'Report Data', badge: 'Data', color: '#ec4899' },
  { src: '/dashbaord/location player.png', label: 'Location Playback', badge: 'Playback', color: '#ef4444' },
];

/* ── Real Dashboard Screenshot ── */
function DashboardMockup({ onScreenshotClick }) {
  const [currentImg, setCurrentImg] = useState(0);
  const heroImages = allScreenshots.slice(0, 3); // dashboard, fleet, reports

  useEffect(() => {
    const timer = setInterval(() => setCurrentImg(p => (p + 1) % heroImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScaleIn delay={0.4}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 20,
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: `0 40px 80px var(--shadow-color)`,
        position: 'relative',
      }}>
        {/* Browser chrome */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
          <div style={{
            marginLeft: 12, flex: 1, padding: '5px 14px', borderRadius: 6,
            background: 'var(--surface-tint)', fontSize: 11, color: 'var(--text-secondary)',
            fontFamily: 'monospace',
          }}>
            app.driveinnovate.in/{heroImages[currentImg].label.toLowerCase().replace(/ /g, '-')}
          </div>
        </div>

        {/* Screenshot carousel — clickable */}
        <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => onScreenshotClick(currentImg)}
        >
          {heroImages.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt={img.label}
              initial={false}
              animate={{ opacity: i === currentImg ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '100%', display: 'block',
                position: i === 0 ? 'relative' : 'absolute',
                top: 0, left: 0,
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          {/* Click hint overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, var(--overlay-bg) 0%, transparent 40%)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              padding: 20, transition: 'opacity 0.3s',
            }}
          >
            <span style={{
              fontSize: 12, fontWeight: 600, color: 'var(--text-on-primary)',
              background: 'var(--primary)', padding: '6px 16px', borderRadius: 8,
            }}>
              Click to view fullscreen
            </span>
          </motion.div>
        </div>

        {/* Indicators */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center', padding: '12px 0',
          background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
        }}>
          {heroImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              style={{
                cursor: 'pointer', border: 'none', padding: '4px 12px',
                borderRadius: 6, fontSize: 11, fontWeight: 600,
                background: i === currentImg ? 'var(--primary)' : 'var(--surface-hover)',
                color: i === currentImg ? 'var(--text-on-primary)' : 'var(--text-secondary)',
                transition: 'all 0.3s', fontFamily: 'var(--font-display)',
              }}
            >{img.label}</button>
          ))}
        </div>
      </div>
    </ScaleIn>
  );
}

/* ── Fullscreen Lightbox ── */
function ScreenshotLightbox({ idx, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(idx);
  const goNext = () => setCurrentIdx(p => (p + 1) % allScreenshots.length);
  const goPrev = () => setCurrentIdx(p => (p - 1 + allScreenshots.length) % allScreenshots.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, []);

  const ss = allScreenshots[currentIdx];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }} transition={{ type: 'spring', damping: 25 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 2001,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 20, pointerEvents: 'none',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', maxWidth: 1100, marginBottom: 12, pointerEvents: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 6,
              background: ss.color + '25', color: ss.color,
            }}>{ss.badge}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{ss.label}</span>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{currentIdx + 1} / {allScreenshots.length}</span>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
            width: 36, height: 36, borderRadius: 10, cursor: 'pointer', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><HiX /></button>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', maxWidth: 1100, width: '100%', pointerEvents: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIdx}
              src={ss.src}
              alt={ss.label}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
              style={{
                width: '100%', borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              }}
            />
          </AnimatePresence>
          <button onClick={goPrev} className="hero-lb-nav hero-lb-prev" style={{
            position: 'absolute', left: -52, top: '50%', transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}><HiArrowLeft /></button>
          <button onClick={goNext} className="hero-lb-nav hero-lb-next" style={{
            position: 'absolute', right: -52, top: '50%', transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}><HiArrowRight /></button>
        </div>

        {/* Thumbnails */}
        <div style={{
          display: 'flex', gap: 8, marginTop: 16, pointerEvents: 'auto',
          overflowX: 'auto', maxWidth: '100%', padding: '4px 0',
        }}>
          {allScreenshots.map((s, i) => (
            <img key={i} src={s.src} alt={s.label}
              onClick={() => setCurrentIdx(i)}
              style={{
                width: 80, height: 50, objectFit: 'cover', borderRadius: 8, cursor: 'pointer',
                border: i === currentIdx ? `2px solid ${s.color}` : '2px solid transparent',
                opacity: i === currentIdx ? 1 : 0.5, transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}

/* ── Animated vehicle path ── */
function VehiclePath() {
  return (
    <svg viewBox="0 0 400 100" style={{ width: '100%', height: 60, opacity: 0.3 }}>
      <motion.path
        d="M0 50 Q100 10 200 50 T400 50"
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <defs>
        <linearGradient id="pathGrad">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════ HOME PAGE ═══════ */
export default function Home() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
      }}>
        <GlowOrb size={600} color="var(--primary)" x="20%" y="30%" opacity={0.08} />
        <GlowOrb size={500} color="var(--accent)" x="80%" y="60%" opacity={0.06} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
            {/* Left: text */}
            <div>
              <FadeIn delay={0.1}>
                <span className="badge badge-cyan" style={{ marginBottom: 20, display: 'inline-flex' }}>
                  <HiLightningBolt /> Intelligent Fleet Platform
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}>
                  Track Every Mile.<br />
                  <span className="gradient-text">Drive Every Insight.</span>
                </h1>
                <div style={{ marginTop: 18, marginBottom: 18 }}>
                  <span className="badge badge-green" style={{ marginRight: 10 }}>
                    Whitelisting & Lease Service
                  </span>
                  <span className="badge badge-blue" style={{ marginRight: 10 }}>
                    Custom Logo & Domain
                  </span>
                  <span className="badge badge-purple" style={{ marginRight: 10 }}>
                    Favicon & Copyright
                  </span>
                  
                </div>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 480, marginBottom: 36 }}>
                  Real-time GPS tracking, comprehensive fleet analytics, speed violation detection, and intelligent reporting — all in one powerful platform.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link to="/dashboard" className="btn btn-primary">
                    View Dashboard →
                  </Link>
                  <Link to="/features" className="btn btn-outline">
                    Explore Features
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.65}>
                <VehiclePath />
              </FadeIn>
            </div>

            {/* Right: dashboard mockup */}
            <div className="hero-mockup">
              <Float amplitude={8} duration={5}>
                <DashboardMockup onScreenshotClick={(i) => setLightboxIdx(i)} />
              </Float>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--section-alt)' }}>
        <div className="container" style={{ padding: '50px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              { value: 500, suffix: '+', label: 'Vehicles Tracked' },
              { value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
              { value: 13, suffix: '', label: 'Packet Types' },
              { value: 24, suffix: '/7', label: 'Live Monitoring' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                  <span className="gradient-text">
                    <CountUp target={s.value} duration={2} suffix={s.suffix} />
                  </span>
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="section" style={{ position: 'relative' }}>
        <GlowOrb size={400} color="var(--accent)" x="90%" y="20%" opacity={0.05} />
        <div className="container">
          <SectionHeading
            badge="Platform Capabilities"
            title={<>Everything You Need to <span className="gradient-text">Manage Your Fleet</span></>}
            subtitle="From real-time tracking to intelligent speed violation analysis, DriveInnovate covers every aspect of modern fleet management."
          />

          <StaggerContainer stagger={0.08} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}>
            {[
            ].map((f, i) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 16,
                  padding: 28,
                  border: '1px solid var(--border)',
                  cursor: 'default',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = f.color + '40'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: f.color + '18',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: f.color,
                  marginBottom: 16,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ background: 'var(--section-alt)' }}>
        <div className="container">
          <SectionHeading
            badge="How It Works"
            title={<>Three Steps to <span className="gradient-text">Full Fleet Control</span></>}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { step: '01', title: 'Install Device', desc: 'Mount a GT06 or FMB125 GPS tracker in your vehicle. It automatically connects to our servers.', emoji: '📡' },
              { step: '02', title: 'Register Vehicle', desc: 'Add vehicle details — registration number, IMEI, device type, and choose an icon for the map.', emoji: '🚗' },
              { step: '03', title: 'Monitor & Analyze', desc: 'Access your live dashboard, view reports, receive alerts, and track every mile in real-time.', emoji: '📊' },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 20,
                  padding: 36,
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    fontSize: 48, marginBottom: 20,
                  }}>{item.emoji}</div>
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    fontSize: 40, fontWeight: 900, fontFamily: 'var(--font-display)',
                    color: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                  }}>{item.step}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        <GlowOrb size={500} color="var(--primary)" x="50%" y="50%" opacity={0.08} />
        <div className="container">
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
              Ready to <span className="gradient-text">Transform</span> Your Fleet?
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Join hundreds of fleet operators who trust DriveInnovate for real-time GPS tracking and intelligent analytics.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>
                Start Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-outline" style={{ fontSize: 16, padding: '16px 40px' }}>
                View Pricing
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid p { margin-left: auto; margin-right: auto; }
          .hero-grid > div:first-child > div:last-child { justify-content: center; }
          .hero-mockup { order: -1; }
          .hero-lb-prev { left: 8px !important; }
          .hero-lb-next { right: 8px !important; }
        }
      `}</style>

      {/* ── Screenshot Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <ScreenshotLightbox idx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
