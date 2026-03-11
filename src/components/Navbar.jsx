import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiAdjustments, HiLocationMarker, HiTruck, HiChartBar, HiShieldCheck, HiBell, HiDocumentReport, HiClock, HiLightningBolt, HiChevronDown, HiCog, HiPhotograph, HiGlobeAlt, HiMail } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

/* ── Mega menu content config ── */
const megaMenus = {
  whitelisting: {
    label: 'Whitelisting',
    to: '/whitelisting',
    columns: [
      {
        heading: 'Branding & Access',
        items: [
          { icon: <HiShieldCheck />, label: 'Whitelisting & Lease', desc: 'Restrict access, manage leases, client domains', color: '#22d3ee' },
          { icon: <HiPhotograph />, label: 'Custom Logo & Favicon', desc: 'Upload logo and favicon for clients', color: '#a21caf' },
          { icon: <HiGlobeAlt />, label: 'Client Domain', desc: 'Unique domain for each client', color: '#3b82f6' },
          { icon: <HiMail />, label: 'SMTP Mail Config', desc: 'Client-specific email notifications', color: '#f59e0b' },
          { icon: <HiCog />, label: 'Copyright & Legal', desc: 'Set copyright and legal info', color: '#10b981' },
          { icon: <HiDocumentReport />, label: 'Lease Management', desc: 'Manage lease terms and renewals', color: '#06b6d4' },
        ],
      },
    ],
    media: { src: '/dashbaord/whitelisting.png', label: 'Whitelisting & Lease Service' },
  },
  features: {
    label: 'Features',
    to: '/features',
    columns: [
      {
        heading: 'Tracking',
        items: [
          { icon: <HiLocationMarker />, label: 'Live GPS Tracking', desc: 'Real-time vehicle positioning', color: '#3b82f6' },
          { icon: <HiClock />, label: 'Location Playback', desc: 'Replay historical routes', color: '#ec4899' },
          { icon: <HiBell />, label: 'Real-time Alerts', desc: 'Instant notifications', color: '#ef4444' },
        ],
      },
      {
        heading: 'Analytics',
        items: [
          { icon: <HiChartBar />, label: 'Trip & Stop Reports', desc: 'Automatic trip detection', color: '#8b5cf6' },
          { icon: <HiShieldCheck />, label: 'Speed Violations', desc: 'Over-speed severity alerts', color: '#f59e0b' },
          { icon: <HiDocumentReport />, label: 'Fleet Reports', desc: 'Comprehensive analytics', color: '#06b6d4' },
        ],
      },
    ],
    media: { src: '/dashbaord/reports.png', label: 'Reports & Analytics' },
  },
  devices: {
    label: 'Devices',
    to: '/devices',
    columns: [
      {
        heading: 'Supported Hardware',
        items: [
          { icon: <HiLightningBolt />, label: 'Teltonika FMB125', desc: 'Advanced 4G LTE tracker', color: '#10b981' },
          { icon: <HiTruck />, label: 'Concox GT06N', desc: 'Reliable 2G GPS tracker', color: '#3b82f6' },
          { icon: <HiCog />, label: 'OBD Devices', desc: 'Engine diagnostics support', color: '#f59e0b' },
        ],
      },
    ],
    media: { src: '/dashbaord/vehicle details.png', label: 'Vehicle Details' },
  },
  dashboard: {
    label: 'Dashboard',
    to: '/dashboard',
    columns: [
      {
        heading: 'App Screens',
        items: [
          { icon: <HiChartBar />, label: 'Dashboard Overview', desc: 'At-a-glance fleet stats', color: '#10b981' },
          { icon: <HiTruck />, label: 'Fleet Management', desc: 'Manage all vehicles', color: '#8b5cf6' },
          { icon: <HiDocumentReport />, label: 'Data Reports', desc: 'Trip and speed analysis', color: '#f59e0b' },
        ],
      },
    ],
    media: { src: '/dashbaord/dashboard.png', label: 'Dashboard Overview' },
  },
  pricing: {
    label: 'Pricing',
    to: '/pricing',
    columns: [
      {
        heading: 'Plans',
        items: [
          { icon: <HiLightningBolt />, label: 'Starter', desc: 'Up to 10 vehicles', color: '#3b82f6' },
          { icon: <HiShieldCheck />, label: 'Professional', desc: 'Up to 50 vehicles', color: '#10b981' },
          { icon: <HiTruck />, label: 'Enterprise', desc: 'Unlimited fleet size', color: '#8b5cf6' },
        ],
      },
    ],
    media: { src: '/dashbaord/fleet.png', label: 'Fleet Management' },
  },
};

const allLinks = [
  { to: '/', label: 'Home' },
  { key: 'features', label: 'Features', to: '/features' },
  { key: 'devices', label: 'Devices', to: '/devices' },
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { key: 'whitelisting', label: 'Whitelisting', to: '/whitelisting' },
  { key: 'pricing', label: 'Pricing', to: '/pricing' },
  { to: '/contact', label: 'Contact' },
];

/* ── MegaDropdown sub-component ── */
function MegaDropdown({ menuKey, onClose }) {
  const menu = megaMenus[menuKey];
  if (!menu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: 8,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 0,
        minWidth: menu.columns.length > 1 ? 680 : 520,
        boxShadow: '0 25px 80px var(--shadow-color)',
        overflow: 'hidden',
        zIndex: 1001,
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* Content columns */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', gap: 24 }}>
          {menu.columns.map((col, ci) => (
            <div key={ci} style={{ flex: 1 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'var(--muted)', padding: '0 8px 10px',
              }}>{col.heading}</div>
              {col.items.map((item, ii) => (
                <Link
                  key={ii}
                  to={menu.to}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 8px', borderRadius: 12,
                    transition: 'background 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: item.color + '15',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.color, fontSize: 16,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Media preview */}
        <div style={{
          width: 220, padding: 16,
          background: 'var(--surface-tint)',
          borderLeft: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
        }}>
          <img
            src={menu.media.src}
            alt={menu.media.label}
            style={{
              width: '100%', borderRadius: 12,
              border: '1px solid var(--border)',
              boxShadow: '0 8px 24px var(--shadow-color)',
            }}
            loading="lazy"
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{menu.media.label}</div>
            <Link
              to={menu.to}
              onClick={onClose}
              style={{
                fontSize: 11, color: 'var(--primary)', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
              }}
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface-tint)',
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {menu.label} — DriveInnovate Platform
        </span>
        <Link
          to={menu.to}
          onClick={onClose}
          style={{
            fontSize: 12, fontWeight: 600, color: 'var(--primary)',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}
        >
          View all {menu.label.toLowerCase()} →
        </Link>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('theme');
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { theme, themeKey, setThemeKey, themes, layout, layoutKey, setLayoutKey, layouts } = useTheme();
  const settingsRef = useRef(null);
  const megaTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveMega(null); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMegaEnter = (key) => {
    clearTimeout(megaTimeoutRef.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  const isDark = theme.mode === 'dark';
  const darkThemes = Object.values(themes).filter(t => t.mode === 'dark');
  const lightThemes = Object.values(themes).filter(t => t.mode === 'light');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14,
            color: 'var(--text-on-primary)',
          }}>
            DI
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Drive<span style={{ color: 'var(--primary-light)' }}>Innovate</span>
          </span>
        </Link>

        {/* Desktop mega menu links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="nav-desktop">
          {allLinks.map(l => {
            const hasMega = l.key && megaMenus[l.key];
            return (
              <div
                key={l.to}
                style={{ position: 'relative' }}
                onMouseEnter={() => hasMega && handleMegaEnter(l.key)}
                onMouseLeave={() => hasMega && handleMegaLeave()}
              >
                <Link
                  to={l.to}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--btn-radius, 8px)',
                    fontSize: 14,
                    fontWeight: pathname === l.to ? 600 : 400,
                    color: pathname === l.to ? 'var(--text)' : 'var(--text-secondary)',
                    background: pathname === l.to ? 'var(--surface-hover)' : 'transparent',
                    transition: 'all 0.25s',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {l.label}
                  {hasMega && (
                    <HiChevronDown style={{
                      fontSize: 12, transition: 'transform 0.2s',
                      transform: activeMega === l.key ? 'rotate(180deg)' : 'rotate(0)',
                    }} />
                  )}
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {hasMega && activeMega === l.key && (
                    <MegaDropdown menuKey={l.key} onClose={() => setActiveMega(null)} />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Link to="/contact" className="btn btn-primary" style={{ marginLeft: 12, padding: '10px 24px', fontSize: 13 }}>
            Get Started
          </Link>

          {/* Settings Panel */}
          <div ref={settingsRef} style={{ position: 'relative', marginLeft: 8 }}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              style={{
                width: 36, height: 36, borderRadius: 10,
                border: '1px solid var(--border)',
                background: settingsOpen ? 'var(--surface-hover)' : 'transparent',
                cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
              title="Appearance settings"
            >
              <HiAdjustments />
            </button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: 8,
                    background: 'var(--bg-card)', borderRadius: 16,
                    border: '1px solid var(--border)',
                    padding: 0, width: 280,
                    boxShadow: `0 20px 60px var(--shadow-color)`,
                    overflow: 'hidden',
                  }}
                >
                  {/* Tab bar */}
                  <div style={{
                    display: 'flex', borderBottom: '1px solid var(--border)',
                  }}>
                    {[
                      { key: 'theme', label: 'Theme' },
                      { key: 'layout', label: 'Layout' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setSettingsTab(tab.key)}
                        style={{
                          flex: 1, padding: '12px 0', border: 'none', cursor: 'pointer',
                          fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontFamily: 'var(--font-display)',
                          background: settingsTab === tab.key ? 'var(--surface-tint)' : 'transparent',
                          color: settingsTab === tab.key ? 'var(--text)' : 'var(--text-secondary)',
                          borderBottom: settingsTab === tab.key ? `2px solid var(--primary)` : '2px solid transparent',
                          transition: 'all 0.2s',
                        }}
                      >{tab.label}</button>
                    ))}
                  </div>

                  {settingsTab === 'theme' && (
                    <div style={{ padding: 10, maxHeight: 380, overflowY: 'auto' }}>
                      <div style={{ padding: '4px 6px 6px', fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Dark
                      </div>
                      {darkThemes.map(t => (
                        <button
                          key={t.key}
                          onClick={() => { setThemeKey(t.key); }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                            padding: '8px 10px', borderRadius: 10,
                            border: themeKey === t.key ? `1.5px solid ${t.primary}` : '1.5px solid transparent',
                            cursor: 'pointer',
                            background: themeKey === t.key ? 'var(--surface-hover)' : 'transparent',
                            color: 'var(--text)', fontSize: 13,
                            fontWeight: themeKey === t.key ? 600 : 400,
                            fontFamily: 'var(--font-display)',
                            transition: 'all 0.15s', marginBottom: 2,
                          }}
                        >
                          <span style={{ fontSize: 15 }}>{t.emoji}</span>
                          <span>{t.label}</span>
                          <div style={{
                            marginLeft: 'auto', display: 'flex', gap: 3,
                          }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.bg, border: '1px solid var(--border)' }} />
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.primary }} />
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.accent }} />
                          </div>
                        </button>
                      ))}

                      <div style={{ padding: '10px 6px 6px', fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Light
                      </div>
                      {lightThemes.map(t => (
                        <button
                          key={t.key}
                          onClick={() => { setThemeKey(t.key); }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                            padding: '8px 10px', borderRadius: 10,
                            border: themeKey === t.key ? `1.5px solid ${t.primary}` : '1.5px solid transparent',
                            cursor: 'pointer',
                            background: themeKey === t.key ? 'var(--surface-hover)' : 'transparent',
                            color: 'var(--text)', fontSize: 13,
                            fontWeight: themeKey === t.key ? 600 : 400,
                            fontFamily: 'var(--font-display)',
                            transition: 'all 0.15s', marginBottom: 2,
                          }}
                        >
                          <span style={{ fontSize: 15 }}>{t.emoji}</span>
                          <span>{t.label}</span>
                          <div style={{
                            marginLeft: 'auto', display: 'flex', gap: 3,
                          }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.bg, border: '1px solid var(--border)' }} />
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.primary }} />
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: t.accent }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {settingsTab === 'layout' && (
                    <div style={{ padding: 10 }}>
                      <div style={{ padding: '4px 6px 6px', fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Page Layout
                      </div>
                      {Object.values(layouts).map(l => (
                        <button
                          key={l.key}
                          onClick={() => setLayoutKey(l.key)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 10px', borderRadius: 10,
                            border: layoutKey === l.key ? `1.5px solid var(--primary)` : '1.5px solid transparent',
                            cursor: 'pointer',
                            background: layoutKey === l.key ? 'var(--surface-hover)' : 'transparent',
                            color: 'var(--text)', fontSize: 13,
                            fontWeight: layoutKey === l.key ? 600 : 400,
                            fontFamily: 'var(--font-display)',
                            transition: 'all 0.15s', marginBottom: 2,
                          }}
                        >
                          <span style={{
                            width: 28, height: 28, borderRadius: 6,
                            background: 'var(--surface-tint)', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14,
                          }}>{l.icon}</span>
                          <div>
                            <div>{l.label}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                              {l.container} · {l.cardRadius} radius
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="nav-mobile-btns">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="nav-mobile-settings"
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--text-secondary)', fontSize: 22, cursor: 'pointer',
            }}
          >
            <HiAdjustments />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--text)', fontSize: 26, cursor: 'pointer',
            }}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-menu"
            style={{
              overflow: 'hidden',
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {allLinks.map(l => {
                const hasMega = l.key && megaMenus[l.key];
                const isExpanded = mobileExpanded === l.key;
                const menu = hasMega ? megaMenus[l.key] : null;

                return (
                  <div key={l.to}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link
                        to={l.to}
                        style={{
                          flex: 1, padding: '12px 16px', borderRadius: 10, fontSize: 15,
                          fontWeight: pathname === l.to ? 600 : 400,
                          color: pathname === l.to ? 'var(--text)' : 'var(--text-secondary)',
                          background: pathname === l.to ? 'var(--surface-hover)' : 'transparent',
                        }}
                      >
                        {l.label}
                      </Link>
                      {hasMega && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : l.key)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-secondary)', fontSize: 18, padding: '8px 12px',
                            transition: 'transform 0.2s',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                          }}
                        >
                          <HiChevronDown />
                        </button>
                      )}
                    </div>

                    {/* Mobile mega accordion */}
                    <AnimatePresence>
                      {hasMega && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden', paddingLeft: 16 }}
                        >
                          {/* Media preview */}
                          <div style={{
                            padding: '8px 12px 12px', display: 'flex', gap: 12, alignItems: 'center',
                          }}>
                            <img
                              src={menu.media.src}
                              alt={menu.media.label}
                              style={{
                                width: 80, height: 50, objectFit: 'cover',
                                borderRadius: 8, border: '1px solid var(--border)',
                              }}
                            />
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{menu.media.label}</div>
                              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Preview</div>
                            </div>
                          </div>

                          {menu.columns.map((col, ci) => (
                            <div key={ci}>
                              {col.items.map((item, ii) => (
                                <Link
                                  key={ii}
                                  to={menu.to}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '8px 12px', borderRadius: 8, fontSize: 13,
                                    color: 'var(--text-secondary)',
                                  }}
                                >
                                  <span style={{ color: item.color, fontSize: 14 }}>{item.icon}</span>
                                  <span>{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 12, justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .nav-mobile-settings { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
