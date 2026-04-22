import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, ScaleIn, GlowOrb, SectionHeading, CountUp } from '../components/Animations';
import { HiEye, HiChartBar, HiDocumentReport, HiCog, HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const screenshots = [
  {
    src: '/dashbaord/1.png',
    title: 'Secure Login',
    desc: 'OTP-based authentication with JWT tokens. Clean, minimal login interface.',
    badge: 'Auth',
    color: '#3b82f6',
  },
  {
    src: '/dashbaord/2.png',
    title: 'Dashboard Overview',
    desc: 'At-a-glance vehicle stats, active counts, and quick-action cards for fleet managers.',
    badge: 'Home',
    color: '#10b981',
  },
  {
    src: '/dashbaord/3.png',
    title: 'My Fleet',
    desc: 'All vehicles in one list. Status-coded with speed, location, device health and live sync.',
    badge: 'Fleet',
    color: '#8b5cf6',
  },
  {
    src: '/dashbaord/4.png',
    title: 'Vehicle Details',
    desc: 'Deep dive into any vehicle — real-time GPS, battery, signal, ignition, and device-specific data.',
    badge: 'Detail',
    color: '#06b6d4',
  },
  {
    src: '/dashbaord/5.png',
    title: 'Reports Dashboard',
    desc: 'Trip, stop, speed violation, and engine hours reports with date range filters and CSV export.',
    badge: 'Reports',
    color: '#f59e0b',
  },
  {
    src: '/dashbaord/6.png',
    title: 'Report Data',
    desc: 'Detailed tabular view of trip data with distance, duration, speed metrics for every trip segment.',
    badge: 'Data',
    color: '#ec4899',
  },
  {
    src: '/dashbaord/7.png',
    title: 'Live Tracking & Trips',
    desc: 'Real-time map with vehicle positions, trip playback, and historical route replay at variable speeds.',
    badge: 'Live',
    color: '#ef4444',
  },
  {
    src: '/dashbaord/8.png',
    title: 'Geofence Management',
    desc: 'Draw circular or polygon geofences on the map. Assign to vehicles or groups for entry/exit alerts.',
    badge: 'Geofence',
    color: '#14b8a6',
  },
  {
    src: '/dashbaord/9.png',
    title: 'Geofence Details',
    desc: 'Configure fence radius, assigned vehicles, trigger conditions, and linked alert rules in one place.',
    badge: 'Geofence',
    color: '#0ea5e9',
  },
  {
    src: '/dashbaord/10.png',
    title: 'Alerts & Notifications',
    desc: 'Centralised bell inbox with speed, geofence, ignition, and device health alerts — all live.',
    badge: 'Alerts',
    color: '#f43f5e',
  },
  {
    src: '/dashbaord/11.png',
    title: 'Alert Rules',
    desc: 'Build custom alert rules with conditions, thresholds, and email/bell delivery channels.',
    badge: 'Rules',
    color: '#a855f7',
  },
  {
    src: '/dashbaord/12.png',
    title: 'Master Settings',
    desc: 'Papa-only control panel for device types, vehicle state definitions, and platform-wide config.',
    badge: 'Admin',
    color: '#6366f1',
  },
  {
    src: '/dashbaord/13.png',
    title: 'Device Type Manager',
    desc: 'Define device models and per-device vehicle state rules with custom conditions and mappings.',
    badge: 'Devices',
    color: '#84cc16',
  },
  {
    src: '/dashbaord/14.png',
    title: 'Groups & Access',
    desc: 'Organise vehicles into groups, manage user access, and assign role-based permissions.',
    badge: 'Groups',
    color: '#eab308',
  },
];

export default function DashboardPreview() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const goNext = () => setLightboxIdx((prev) => (prev + 1) % screenshots.length);
  const goPrev = () => setLightboxIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx]);

  return (
    <main style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingBottom: 40 }}>
        <GlowOrb size={500} color="var(--primary)" x="60%" y="20%" opacity={0.06} />
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              <HiEye /> Dashboard Preview
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              See Your Fleet in <span className="gradient-text">Real Time</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Real screenshots from the DriveInnovate dashboard. Click any image to explore the full interface.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hero Screenshot — Full-width featured image */}
      <section style={{ paddingBottom: 60 }}>
        <div className="container">
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => openLightbox(1)}
              style={{
                borderRadius: 24, overflow: 'hidden',
                border: '1px solid var(--border)', cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 40px 100px var(--shadow-color)',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px',
                background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                <div style={{
                  marginLeft: 16, flex: 1, padding: '6px 16px', borderRadius: 8,
                  background: 'var(--surface-tint)', fontSize: 12,
                  color: 'var(--text-secondary)', fontFamily: 'monospace',
                }}>
                  app.driveinnovate.in/dashboard
                </div>
              </div>
              <img
                src={screenshots[1].src}
                alt={screenshots[1].title}
                style={{ width: '100%', display: 'block' }}
                loading="eager"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0, top: 40,
                  background: 'linear-gradient(to top, var(--overlay-bg) 0%, transparent 50%)',
                  display: 'flex', alignItems: 'flex-end', padding: 28,
                }}
              >
                <div>
                  <span className="badge badge-blue" style={{ marginBottom: 8 }}>{screenshots[1].badge}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 700 }}>{screenshots[1].title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{screenshots[1].desc}</p>
                </div>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Screenshot Grid */}
      <section className="section">
        <div className="container">
          <SectionHeading
            badge="App Screens"
            title={<>Every Screen, <span className="gradient-text">Purpose-Built</span></>}
            subtitle="Click any screen to see the full-size preview."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 20, marginTop: 40,
          }}>
            {screenshots.map((ss, i) => (
              <ScaleIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => openLightbox(i)}
                  style={{
                    background: 'var(--bg-card)', borderRadius: 18,
                    overflow: 'hidden', border: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ss.color + '50'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <motion.img
                      src={ss.src} alt={ss.title} loading="lazy"
                      style={{ width: '100%', display: 'block', transition: 'transform 0.4s' }}
                      whileHover={{ scale: 1.04 }}
                    />
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                        padding: '4px 10px', borderRadius: 6,
                        background: ss.color + '20', color: ss.color,
                        letterSpacing: '0.06em', backdropFilter: 'blur(10px)',
                      }}>{ss.badge}</span>
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{ss.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ss.desc}</p>
                  </div>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section" style={{ background: 'var(--section-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { label: 'App Screens', value: 14, suffix: '+', color: 'var(--primary)', icon: <HiEye size={20} /> },
              { label: 'Data Points / Day', value: 2.4, suffix: 'M', color: 'var(--accent)', icon: <HiChartBar size={20} /> },
              { label: 'Report Types', value: 6, suffix: '', color: '#8b5cf6', icon: <HiDocumentReport size={20} /> },
              { label: 'Device Types', value: 6, suffix: '+', color: '#f59e0b', icon: <HiCog size={20} /> },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  background: 'var(--bg-card)', borderRadius: 14, padding: 24,
                  border: '1px solid var(--border)', textAlign: 'center',
                }}>
                  <div style={{ color: s.color, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-display)', color: s.color }}>
                    {typeof s.value === 'number' && !isNaN(s.value) ? <CountUp end={s.value} /> : 0}{s.suffix}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeLightbox}
              style={{
                position: 'fixed', inset: 0, zIndex: 2000,
                background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', damping: 25 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 2001,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 20, pointerEvents: 'none',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', maxWidth: 1100, marginBottom: 12, pointerEvents: 'auto',
              }}>
                <div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 6,
                    background: screenshots[lightboxIdx].color + '25',
                    color: screenshots[lightboxIdx].color,
                  }}>{screenshots[lightboxIdx].badge}</span>
                  <span style={{ marginLeft: 12, fontSize: 16, fontWeight: 700 }}>{screenshots[lightboxIdx].title}</span>
                  <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--text-secondary)' }}>{lightboxIdx + 1} / {screenshots.length}</span>
                </div>
                <button onClick={closeLightbox} style={{
                  background: 'var(--surface-hover)', border: 'none', color: '#fff',
                  width: 36, height: 36, borderRadius: 10, cursor: 'pointer', fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><HiX /></button>
              </div>

              <div style={{ position: 'relative', maxWidth: 1100, width: '100%', pointerEvents: 'auto' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIdx}
                    src={screenshots[lightboxIdx].src}
                    alt={screenshots[lightboxIdx].title}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
                    style={{
                      width: '100%', borderRadius: 16,
                      border: '1px solid var(--border)',
                      boxShadow: '0 30px 80px var(--shadow-color)',
                    }}
                  />
                </AnimatePresence>
                <button onClick={goPrev} className="lb-nav lb-prev" style={{
                  position: 'absolute', left: -52, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border)',
                  background: 'var(--overlay-bg)', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}><HiArrowLeft /></button>
                <button onClick={goNext} className="lb-nav lb-next" style={{
                  position: 'absolute', right: -52, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: 12, border: '1px solid var(--border)',
                  background: 'var(--overlay-bg)', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}><HiArrowRight /></button>
              </div>

              <p style={{ marginTop: 14, fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 600, pointerEvents: 'auto' }}>
                {screenshots[lightboxIdx].desc}
              </p>

              <div style={{
                display: 'flex', gap: 8, marginTop: 16, pointerEvents: 'auto',
                overflowX: 'auto', maxWidth: '100%', padding: '4px 0',
              }}>
                {screenshots.map((ss, i) => (
                  <img key={i} src={ss.src} alt={ss.title}
                    onClick={() => setLightboxIdx(i)}
                    style={{
                      width: 80, height: 50, objectFit: 'cover', borderRadius: 8, cursor: 'pointer',
                      border: i === lightboxIdx ? `2px solid ${ss.color}` : '2px solid transparent',
                      opacity: i === lightboxIdx ? 1 : 0.5, transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          main section .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .lb-prev { left: 8px !important; }
          .lb-next { right: 8px !important; }
        }
      `}</style>
    </main>
  );
}
