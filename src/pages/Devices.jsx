import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, staggerItem, GlowOrb, SectionHeading } from '../components/Animations';
import { HiChip, HiStatusOnline, HiLightningBolt, HiCheckCircle, HiArrowRight } from 'react-icons/hi';

const devices = [
  {
    id: 'gt06',
    name: 'GT06 / GT06N',
    tagline: 'Industry Standard GPS Tracker',
    brand: 'Concox',
    protocol: 'GT06 Binary Protocol',
    color: '#3b82f6',
    image: '🛰️',
    specs: {
      connectivity: 'GSM / GPRS',
      positioning: 'GPS + LBS',
      battery: 'Built-in rechargeable',
      voltage: '9V – 36V DC',
      accuracy: '± 10m GPS',
      frequency: '10s – 300s configurable',
    },
    packetTypes: 13,
    features: ['Real-time tracking', 'SOS alarm', 'Geo-fencing', 'ACC detection', 'Power cut alarm', 'Defense mode', 'Speed alert', 'Heartbeat monitoring'],
    dataFields: ['latitude', 'longitude', 'speed', 'course', 'battery', 'acc_on', 'gps_tracked', 'gsm_signal', 'voltage', 'defense', 'charge'],
    status: 'fully-supported',
  },
  {
    id: 'fmb125',
    name: 'FMB125',
    tagline: 'Advanced Teltonika Tracker',
    brand: 'Teltonika',
    protocol: 'Codec 8 / 8E AVL',
    color: '#8b5cf6',
    image: '📡',
    specs: {
      connectivity: '2G GSM',
      positioning: 'GPS + GLONASS + Galileo',
      battery: '170mAh Li-Po',
      voltage: '10V – 30V DC',
      accuracy: '± 2.5m GNSS',
      frequency: '1s – 65535s configurable',
    },
    packetTypes: 8,
    features: ['Fuel monitoring', 'Engine CAN data', 'Driver ID (iButton)', 'Temperature sensor', 'Eco driving', 'Over-speeding', 'Harsh braking', 'Towing detection'],
    dataFields: ['latitude', 'longitude', 'altitude', 'speed', 'angle', 'satellites', 'fuel_level', 'engine_rpm', 'coolant_temp', 'driver_id', 'odometer', 'total_distance'],
    status: 'fully-supported',
  },
  {
    id: 'fmb920',
    name: 'FMB920',
    tagline: 'Compact GNSS Tracker',
    brand: 'Teltonika',
    protocol: 'Codec 8 / 8E AVL',
    color: '#06b6d4',
    image: '📍',
    specs: {
      connectivity: '2G GSM',
      positioning: 'GPS + GLONASS',
      battery: '170mAh Li-Po',
      voltage: '10V – 30V DC',
      accuracy: '± 2.5m GNSS',
      frequency: '1s – 65535s configurable',
    },
    packetTypes: 8,
    features: ['Compact form factor', 'Bluetooth 4.0', 'Crash detection', 'Green driving', 'Auto geofence', 'Deep sleep mode', 'FOTA updates', 'Jamming detection'],
    dataFields: ['latitude', 'longitude', 'altitude', 'speed', 'angle', 'satellites', 'movement', 'ignition', 'gsm_signal', 'battery_voltage'],
    status: 'fully-supported',
  },
  {
    id: 'fmb130',
    name: 'FMB130',
    tagline: 'Advanced LTE Cat 1 Tracker',
    brand: 'Teltonika',
    protocol: 'Codec 8 / 8E AVL',
    color: '#10b981',
    image: '🔗',
    specs: {
      connectivity: '4G LTE Cat 1',
      positioning: 'GPS + GLONASS + Galileo + BeiDou',
      battery: '170mAh Li-Po',
      voltage: '10V – 30V DC',
      accuracy: '± 2.5m GNSS',
      frequency: '1s – 65535s configurable',
    },
    packetTypes: 8,
    features: ['4G connectivity', 'CAN adapter support', 'RS-232/485', 'DOUT/DIN x4', '1-Wire interface', 'Dual SIM', 'FMS CAN data', 'IP67 optional'],
    dataFields: ['latitude', 'longitude', 'altitude', 'speed', 'angle', 'satellites', 'odometer', 'fuel_consumed', 'engine_rpm', 'vehicle_speed', 'throttle_position'],
    status: 'fully-supported',
  },
  {
    id: 'wetrack2',
    name: 'WeTrack 2',
    tagline: 'Budget-Friendly Tracker',
    brand: 'Concox',
    protocol: 'GT06 Protocol',
    color: '#f59e0b',
    image: '🔎',
    specs: {
      connectivity: '2G GSM',
      positioning: 'GPS + LBS',
      battery: 'None (wired)',
      voltage: '9V – 100V DC',
      accuracy: '± 10m GPS',
      frequency: '10s – 300s',
    },
    packetTypes: 10,
    features: ['Wide voltage range', 'ACC detection', 'Cut-off fuel/power', 'Anti-theft alarm', 'Geo-fence', 'Track replay', 'Mileage stats', 'Voice monitoring'],
    dataFields: ['latitude', 'longitude', 'speed', 'course', 'acc_on', 'battery', 'gps_tracked', 'gsm_signal'],
    status: 'fully-supported',
  },
  {
    id: 'tk103',
    name: 'TK103A/B',
    tagline: 'Legacy GPS Tracker',
    brand: 'Xexun / Compatible',
    protocol: 'TK103 ASCII',
    color: '#64748b',
    image: '📟',
    specs: {
      connectivity: '2G GSM',
      positioning: 'GPS',
      battery: 'Built-in rechargeable',
      voltage: '12V – 24V DC',
      accuracy: '± 15m GPS',
      frequency: '30s – 600s',
    },
    packetTypes: 6,
    features: ['Engine cut-off', 'SOS alerts', 'Geo-fence', 'Movement alarm', 'Over-speed alarm', 'Track on demand', 'SMS control', 'Voice monitoring'],
    dataFields: ['latitude', 'longitude', 'speed', 'course', 'gps_fix', 'datetime'],
    status: 'community',
  },
];

const statusLabel = { 'fully-supported': 'Fully Supported', community: 'Community' };
const statusColor = { 'fully-supported': '#10b981', community: '#f59e0b' };

export default function Devices() {
  const [selected, setSelected] = useState(null);
  const openDevice = devices.find(d => d.id === selected);

  return (
    <main style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingBottom: 40 }}>
        <GlowOrb size={500} color="#8b5cf6" x="70%" y="15%" opacity={0.06} />
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              <HiChip /> Supported Devices
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              One Platform, <span className="gradient-text">Many Devices</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
              DriveInnovate supports GT06 protocol, Teltonika Codec 8/8E, and more — auto-detecting device type and routing data to the correct collection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Device Grid */}
      <section className="section">
        <div className="container">
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {devices.map((d, i) => (
              <motion.div
                key={d.id}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelected(d.id)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 18,
                  padding: 28,
                  border: selected === d.id ? `1.5px solid ${d.color}` : '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Status chip */}
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 6,
                    background: statusColor[d.status] + '18',
                    color: statusColor[d.status],
                    letterSpacing: '0.06em',
                  }}>
                    {statusLabel[d.status]}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: d.color + '12',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 30,
                  }}>{d.image}</div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700 }}>{d.name}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{d.brand} — {d.protocol}</p>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{d.tagline}</p>

                {/* Quick specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  <SpecChip label="Positioning" value={d.specs.positioning.split(' + ').length + ' systems'} />
                  <SpecChip label="Accuracy" value={d.specs.accuracy} />
                  <SpecChip label="Voltage" value={d.specs.voltage} />
                  <SpecChip label="Packets" value={d.packetTypes + ' types'} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                    {d.features.slice(0, 3).map(f => (
                      <span key={f} style={{
                        fontSize: 11, padding: '3px 8px', borderRadius: 5,
                        background: d.color + '10', color: d.color,
                        fontWeight: 500,
                      }}>{f}</span>
                    ))}
                    {d.features.length > 3 && (
                      <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: 'var(--surface-tint)', color: 'var(--text-secondary)' }}>
                        +{d.features.length - 3} more
                      </span>
                    )}
                  </div>
                  <HiArrowRight color="var(--text-secondary)" />
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Device detail modal */}
      <AnimatePresence>
        {openDevice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'var(--overlay-bg)', backdropFilter: 'blur(4px)', zIndex: 1000 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '90vw', maxWidth: 740, maxHeight: '80vh', overflowY: 'auto',
                background: 'var(--bg-card)', borderRadius: 24, padding: 36,
                border: '1px solid var(--border)', zIndex: 1001,
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'var(--text)', fontSize: 22, cursor: 'pointer' }}
              >✕</button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: openDevice.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>
                  {openDevice.image}
                </div>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 800 }}>{openDevice.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{openDevice.brand} — {openDevice.protocol}</p>
                </div>
              </div>

              {/* Specifications Grid */}
              <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 12 }}>Specifications</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 28 }}>
                {Object.entries(openDevice.specs).map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--surface-tint)', borderRadius: 10, padding: '12px 16px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'capitalize', marginBottom: 4 }}>{k.replace(/_/g, ' ')}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 12 }}>Features</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 28 }}>
                {openDevice.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                    <HiCheckCircle color={openDevice.color} size={16} />
                    {f}
                  </div>
                ))}
              </div>

              {/* Data Fields */}
              <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 12 }}>Data Fields</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {openDevice.dataFields.map(d => (
                  <code key={d} style={{
                    padding: '4px 12px', borderRadius: 6, fontSize: 12,
                    background: openDevice.color + '0f', border: '1px solid ' + openDevice.color + '30',
                    color: openDevice.color, fontWeight: 500,
                  }}>{d}</code>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Comparison strip */}
      <section className="section" style={{ background: 'var(--section-alt)' }}>
        <div className="container">
          <SectionHeading
            badge="Device Routing"
            title={<>Automatic Data <span className="gradient-text">Collection Routing</span></>}
            subtitle="DriveInnovate auto-routes incoming data based on device type to the correct MongoDB collection — no manual config."
          />

          <FadeIn>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
              flexWrap: 'wrap', marginTop: 40,
            }}>
              {[
                { label: 'GT06 / WeTrack 2', arrow: '→', collection: 'gt06locations', color: '#3b82f6' },
                { label: 'FMB125 / FMB920 / FMB130', arrow: '→', collection: 'fmb125locations', color: '#8b5cf6' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'var(--bg-card)', borderRadius: 14, padding: '16px 24px',
                    border: '1px solid var(--border)', minWidth: 340,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <HiChip color={item.color} size={20} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 18 }}>{item.arrow}</span>
                  <code style={{
                    padding: '4px 12px', borderRadius: 6, fontSize: 13,
                    background: item.color + '15', color: item.color,
                  }}>{item.collection}</code>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function SpecChip({ label, value }) {
  return (
    <div style={{ background: 'var(--surface-tint)', borderRadius: 8, padding: '8px 12px' }}>
      <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}
