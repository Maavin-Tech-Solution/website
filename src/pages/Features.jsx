import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, SlideIn, StaggerContainer, staggerItem, GlowOrb, SectionHeading } from '../components/Animations';
import {
  HiLocationMarker, HiTruck, HiChartBar, HiShieldCheck, HiBell, HiClock,
  HiDocumentReport, HiLightningBolt, HiKey, HiStatusOnline, HiDatabase,
  HiCog, HiMap, HiUserGroup
} from 'react-icons/hi';

const categories = [
  { key: 'all', label: 'All Features' },
  { key: 'tracking', label: '📍 Tracking' },
  { key: 'reports', label: '📊 Reports' },
  { key: 'alerts', label: '🔔 Alerts' },
  { key: 'management', label: '⚙️ Management' },
];

const features = [
  {
    category: 'tracking',
    icon: <HiLocationMarker size={28} />,
    color: '#3b82f6',
    title: 'Real-Time GPS Tracking',
    desc: 'Sub-second location updates directly from GT06 and FMB125 devices. Watch vehicles move on an interactive Leaflet map with accurate positioning.',
    details: ['Live map with CircleMarkers', 'Auto-zoom to vehicle', 'Speed overlay in real-time', 'Multiple IMEI support'],
  },
  {
    category: 'tracking',
    icon: <HiClock size={28} />,
    color: '#8b5cf6',
    title: 'Location Playback',
    desc: 'Replay any vehicle\'s route over a date range with full timeline controls. Visualize historical GPS data with speed and stop annotations.',
    details: ['Date range selector', 'Play/pause/speed controls', 'Up to 50,000 data points', 'Paginated data loading'],
  },
  {
    category: 'tracking',
    icon: <HiMap size={28} />,
    color: '#14b8a6',
    title: 'Fleet Map View',
    desc: 'See all your vehicles on a single map. Color-coded by status — moving (green), stopped (amber), offline (gray). Click to drill into any vehicle.',
    details: ['Clustered markers', 'Status-based coloring', 'Quick sync popup', 'Focus & zoom controls'],
  },
  {
    category: 'reports',
    icon: <HiChartBar size={28} />,
    color: '#10b981',
    title: 'Trip Reports',
    desc: 'Automatic trip detection based on ignition data. Total distance, duration, average & max speed for every segment. Export as CSV.',
    details: ['Auto-detect trips from GPS', 'Distance in km', 'Max/avg speed per trip', 'CSV export'],
  },
  {
    category: 'reports',
    icon: <HiDocumentReport size={28} />,
    color: '#06b6d4',
    title: 'Stops & Parking',
    desc: 'Detect when vehicles stop and classify them — parking, idle, or traffic. Duration analysis and location mapping for every stop.',
    details: ['🅿️ Parking detection', '⏸️ Idle classification', '🚦 Traffic stops', 'Duration analysis'],
  },
  {
    category: 'reports',
    icon: <HiDatabase size={28} />,
    color: '#ec4899',
    title: 'Engine Hours',
    desc: 'Calculate engine running time from ignition data. Critical for maintenance scheduling and fleet utilization metrics.',
    details: ['Ignition-based calculation', 'Daily/weekly/monthly', 'Maintenance trigger', 'Utilization %'],
  },
  {
    category: 'alerts',
    icon: <HiShieldCheck size={28} />,
    color: '#f59e0b',
    title: 'Speed Violation Detection',
    desc: 'Intelligent over-speed detection with 4-tier severity: LOW, MEDIUM, HIGH, CRITICAL. Acknowledgment workflow and historical tracking.',
    details: ['Configurable speed limits', '4-tier severity (🔵🟡🟠🔴)', 'Acknowledge & review', 'Top violators ranking'],
  },
  {
    category: 'alerts',
    icon: <HiBell size={28} />,
    color: '#ef4444',
    title: 'Real-Time Alarms',
    desc: 'Instant alerts for SOS, power cut, tampering, low battery, geofence breaches, and defense mode triggers from GT06 ALARM packets.',
    details: ['SOS emergency alert', 'Power disconnection', 'Tamper detection', 'Defense mode trigger'],
  },
  {
    category: 'alerts',
    icon: <HiLightningBolt size={28} />,
    color: '#a855f7',
    title: 'Device Health Monitoring',
    desc: 'Monitor battery levels, external voltage, GSM signal strength, and GPS fix status. Get alerted before devices go offline.',
    details: ['Battery % monitoring', 'Voltage tracking', 'Signal strength bars', 'GPS fix status'],
  },
  {
    category: 'management',
    icon: <HiTruck size={28} />,
    color: '#3b82f6',
    title: 'Vehicle Registration',
    desc: 'Register vehicles with reg number, chassis, engine number, IMEI. Select device type, configure server IP/port, and pick a vehicle icon.',
    details: ['Multi-field registration', 'Device type selection', 'Server IP/Port config', 'Vehicle icon picker'],
  },
  {
    category: 'management',
    icon: <HiCog size={28} />,
    color: '#64748b',
    title: 'RTO & Challan Integration',
    desc: 'Fetch RTO vehicle details and track pending challans. Complete government data integration for compliance management.',
    details: ['RTO data lookup', 'Challan tracking', 'Compliance status', 'Auto data refresh'],
  },
  {
    category: 'management',
    icon: <HiUserGroup size={28} />,
    color: '#10b981',
    title: 'Multi-User Clients',
    desc: 'Add sub-clients under your account with parent-child hierarchy. Activity logging tracks every user action for full audit compliance.',
    details: ['Parent/child accounts', 'Activity logging', 'Role-based access', 'Audit trail'],
  },
];

export default function Features() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? features : features.filter(f => f.category === activeCategory);

  return (
    <main style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingBottom: 40 }}>
        <GlowOrb size={500} color="#3b82f6" x="30%" y="20%" opacity={0.06} />
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              <HiLightningBolt /> Platform Features
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Built for <span className="gradient-text">Serious Fleets</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Every feature designed to give you complete visibility and control over your vehicles, drivers, and operations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ paddingBottom: 60 }}>
        <div className="container">
          <FadeIn delay={0.3}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
              {categories.map(c => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 10,
                    border: activeCategory === c.key ? '1px solid var(--primary)' : '1px solid var(--border)',
                    background: activeCategory === c.key ? 'rgba(59,130,246,0.15)' : 'transparent',
                    color: activeCategory === c.key ? 'var(--text)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Feature cards */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((f, i) => (
                <motion.div
                  key={f.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: 18,
                    padding: 30,
                    border: '1px solid var(--border)',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = f.color + '50'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: f.color + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: f.color, marginBottom: 20,
                  }}>{f.icon}</div>

                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 18 }}>{f.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {f.details.map(d => (
                      <span key={d} style={{
                        padding: '5px 11px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 500,
                        background: 'var(--surface-tint)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}>{d}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Packet types table */}
      <section className="section" style={{ background: 'var(--section-alt)' }}>
        <div className="container">
          <SectionHeading
            badge="Protocol Support"
            title={<>13 Packet Types, <span className="gradient-text">One Platform</span></>}
            subtitle="Full GT06 protocol implementation with comprehensive data extraction from every packet type."
          />

          <FadeIn>
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: 16,
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Packet', 'Protocol', 'Data Provided'].map(h => (
                        <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'LOGIN', proto: '0x01', data: 'Device ID, model identification' },
                      { name: 'LOCATION', proto: '0x12', data: 'GPS coordinates, speed, course, ignition' },
                      { name: 'STATUS', proto: '0x13', data: 'Battery, oil, electric, door, defense' },
                      { name: 'ALARM', proto: '0x16', data: 'SOS, power cut, tampering alerts' },
                      { name: 'HEARTBEAT', proto: '0x23', data: 'Voltage, GSM signal, terminal info' },
                      { name: 'LOCATION_EXT', proto: '0x22', data: 'GPS + defense + charge + signal' },
                      { name: 'INFO_TRANSMISSION', proto: '0x94', data: 'Odometer, voltage, settings' },
                    ].map((row, i) => (
                      <motion.tr
                        key={row.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        style={{ borderBottom: '1px solid var(--border)' }}
                      >
                        <td style={{ padding: '14px 20px', fontWeight: 600, fontFamily: 'var(--font-display)' }}>{row.name}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <code style={{ background: 'rgba(59,130,246,0.1)', padding: '3px 10px', borderRadius: 6, fontSize: 13, color: 'var(--primary-light)' }}>{row.proto}</code>
                        </td>
                        <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>{row.data}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
