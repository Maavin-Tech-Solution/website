import React, { createContext, useContext, useState, useEffect } from 'react';

/* ═══════════════════════════════════════════
   THEMES — Dark & Light variants
   ═══════════════════════════════════════════ */
const themes = {
  /* ── Dark Themes ── */
  midnight: {
    key: 'midnight', label: 'Midnight Blue', emoji: '🌑', mode: 'dark',
    primary: '#3b82f6', primaryDark: '#1e3a5f', primaryLight: '#60a5fa',
    accent: '#06b6d4', accentLight: '#22d3ee',
    bg: '#0a0f1a', bgCard: '#111827', bgElevated: '#1e293b',
    text: '#f1f5f9', textSecondary: '#94a3b8',
    border: 'rgba(255,255,255,0.08)', gridColor: 'rgba(59,130,246,0.03)',
    gradientFrom: '#3b82f6', gradientTo: '#06b6d4',
    navBg: 'rgba(10,15,26,0.85)',
    surfaceTint: 'rgba(255,255,255,0.04)', surfaceHover: 'rgba(255,255,255,0.06)',
    sectionAlt: 'rgba(17,24,39,0.4)', overlayBg: 'rgba(0,0,0,0.85)',
    glassBg: 'rgba(17,24,39,0.6)', shadow: 'rgba(0,0,0,0.4)',
    inputBg: 'rgba(255,255,255,0.03)', inputText: '#f1f5f9',
    textOnPrimary: '#ffffff', muted: '#64748b',
  },
  emerald: {
    key: 'emerald', label: 'Emerald Night', emoji: '💚', mode: 'dark',
    primary: '#10b981', primaryDark: '#064e3b', primaryLight: '#34d399',
    accent: '#f59e0b', accentLight: '#fbbf24',
    bg: '#071210', bgCard: '#0d1f1b', bgElevated: '#163830',
    text: '#ecfdf5', textSecondary: '#86efac',
    border: 'rgba(16,185,129,0.12)', gridColor: 'rgba(16,185,129,0.03)',
    gradientFrom: '#10b981', gradientTo: '#f59e0b',
    navBg: 'rgba(7,18,16,0.88)',
    surfaceTint: 'rgba(255,255,255,0.04)', surfaceHover: 'rgba(255,255,255,0.06)',
    sectionAlt: 'rgba(7,18,16,0.4)', overlayBg: 'rgba(0,0,0,0.85)',
    glassBg: 'rgba(13,31,27,0.6)', shadow: 'rgba(0,0,0,0.4)',
    inputBg: 'rgba(255,255,255,0.03)', inputText: '#ecfdf5',
    textOnPrimary: '#ffffff', muted: '#6b8f84',
  },
  purple: {
    key: 'purple', label: 'Royal Purple', emoji: '💜', mode: 'dark',
    primary: '#8b5cf6', primaryDark: '#3b0764', primaryLight: '#a78bfa',
    accent: '#ec4899', accentLight: '#f472b6',
    bg: '#0c0a18', bgCard: '#150f2e', bgElevated: '#221b45',
    text: '#f5f3ff', textSecondary: '#c4b5fd',
    border: 'rgba(139,92,246,0.12)', gridColor: 'rgba(139,92,246,0.03)',
    gradientFrom: '#8b5cf6', gradientTo: '#ec4899',
    navBg: 'rgba(12,10,24,0.88)',
    surfaceTint: 'rgba(255,255,255,0.04)', surfaceHover: 'rgba(255,255,255,0.06)',
    sectionAlt: 'rgba(12,10,24,0.4)', overlayBg: 'rgba(0,0,0,0.85)',
    glassBg: 'rgba(21,15,46,0.6)', shadow: 'rgba(0,0,0,0.4)',
    inputBg: 'rgba(255,255,255,0.03)', inputText: '#f5f3ff',
    textOnPrimary: '#ffffff', muted: '#7c6f9b',
  },
  ocean: {
    key: 'ocean', label: 'Deep Ocean', emoji: '🌊', mode: 'dark',
    primary: '#0ea5e9', primaryDark: '#0c4a6e', primaryLight: '#38bdf8',
    accent: '#14b8a6', accentLight: '#2dd4bf',
    bg: '#061219', bgCard: '#0c1e2e', bgElevated: '#153047',
    text: '#f0f9ff', textSecondary: '#7dd3fc',
    border: 'rgba(14,165,233,0.12)', gridColor: 'rgba(14,165,233,0.03)',
    gradientFrom: '#0ea5e9', gradientTo: '#14b8a6',
    navBg: 'rgba(6,18,25,0.88)',
    surfaceTint: 'rgba(255,255,255,0.04)', surfaceHover: 'rgba(255,255,255,0.06)',
    sectionAlt: 'rgba(6,18,25,0.4)', overlayBg: 'rgba(0,0,0,0.85)',
    glassBg: 'rgba(12,30,46,0.6)', shadow: 'rgba(0,0,0,0.4)',
    inputBg: 'rgba(255,255,255,0.03)', inputText: '#f0f9ff',
    textOnPrimary: '#ffffff', muted: '#5b8aa6',
  },

  /* ── Light Themes ── */
  lightClean: {
    key: 'lightClean', label: 'Clean Light', emoji: '☀️', mode: 'light',
    primary: '#2563eb', primaryDark: '#1e40af', primaryLight: '#3b82f6',
    accent: '#0891b2', accentLight: '#06b6d4',
    bg: '#ffffff', bgCard: '#f8fafc', bgElevated: '#f1f5f9',
    text: '#0f172a', textSecondary: '#64748b',
    border: 'rgba(0,0,0,0.08)', gridColor: 'rgba(59,130,246,0.04)',
    gradientFrom: '#2563eb', gradientTo: '#0891b2',
    navBg: 'rgba(255,255,255,0.88)',
    surfaceTint: 'rgba(0,0,0,0.02)', surfaceHover: 'rgba(0,0,0,0.04)',
    sectionAlt: 'rgba(241,245,249,0.7)', overlayBg: 'rgba(0,0,0,0.6)',
    glassBg: 'rgba(255,255,255,0.7)', shadow: 'rgba(0,0,0,0.08)',
    inputBg: '#ffffff', inputText: '#0f172a',
    textOnPrimary: '#ffffff', muted: '#94a3b8',
  },
  lightWarm: {
    key: 'lightWarm', label: 'Warm Sand', emoji: '🏖️', mode: 'light',
    primary: '#d97706', primaryDark: '#92400e', primaryLight: '#f59e0b',
    accent: '#ea580c', accentLight: '#f97316',
    bg: '#fffbf5', bgCard: '#fef7ed', bgElevated: '#fef3e2',
    text: '#1c1917', textSecondary: '#78716c',
    border: 'rgba(120,113,108,0.12)', gridColor: 'rgba(217,119,6,0.04)',
    gradientFrom: '#d97706', gradientTo: '#ea580c',
    navBg: 'rgba(255,251,245,0.90)',
    surfaceTint: 'rgba(120,113,108,0.03)', surfaceHover: 'rgba(120,113,108,0.06)',
    sectionAlt: 'rgba(254,243,226,0.6)', overlayBg: 'rgba(0,0,0,0.6)',
    glassBg: 'rgba(255,251,245,0.7)', shadow: 'rgba(120,113,108,0.1)',
    inputBg: '#ffffff', inputText: '#1c1917',
    textOnPrimary: '#ffffff', muted: '#a8a29e',
  },
  lightGreen: {
    key: 'lightGreen', label: 'Mint Fresh', emoji: '🌿', mode: 'light',
    primary: '#059669', primaryDark: '#047857', primaryLight: '#10b981',
    accent: '#0284c7', accentLight: '#0ea5e9',
    bg: '#f0fdf9', bgCard: '#ecfdf5', bgElevated: '#d1fae5',
    text: '#022c22', textSecondary: '#4b7c6f',
    border: 'rgba(5,150,105,0.10)', gridColor: 'rgba(5,150,105,0.04)',
    gradientFrom: '#059669', gradientTo: '#0284c7',
    navBg: 'rgba(240,253,249,0.90)',
    surfaceTint: 'rgba(5,150,105,0.03)', surfaceHover: 'rgba(5,150,105,0.06)',
    sectionAlt: 'rgba(209,250,229,0.5)', overlayBg: 'rgba(0,0,0,0.6)',
    glassBg: 'rgba(240,253,249,0.7)', shadow: 'rgba(5,150,105,0.08)',
    inputBg: '#ffffff', inputText: '#022c22',
    textOnPrimary: '#ffffff', muted: '#86b5a7',
  },
  lightLavender: {
    key: 'lightLavender', label: 'Soft Lavender', emoji: '💐', mode: 'light',
    primary: '#7c3aed', primaryDark: '#5b21b6', primaryLight: '#8b5cf6',
    accent: '#db2777', accentLight: '#ec4899',
    bg: '#faf5ff', bgCard: '#f5f0ff', bgElevated: '#ede9fe',
    text: '#1e1033', textSecondary: '#6b5f7d',
    border: 'rgba(124,58,237,0.10)', gridColor: 'rgba(124,58,237,0.04)',
    gradientFrom: '#7c3aed', gradientTo: '#db2777',
    navBg: 'rgba(250,245,255,0.90)',
    surfaceTint: 'rgba(124,58,237,0.03)', surfaceHover: 'rgba(124,58,237,0.06)',
    sectionAlt: 'rgba(237,233,254,0.5)', overlayBg: 'rgba(0,0,0,0.6)',
    glassBg: 'rgba(250,245,255,0.7)', shadow: 'rgba(124,58,237,0.08)',
    inputBg: '#ffffff', inputText: '#1e1033',
    textOnPrimary: '#ffffff', muted: '#a29bb5',
  },
};

/* ═══════════════════════════════════════════
   LAYOUTS
   ═══════════════════════════════════════════ */
const layouts = {
  default: {
    key: 'default', label: 'Default', icon: '▦',
    container: '1200px', sectionPad: 'clamp(60px, 10vw, 120px)',
    cardRadius: '16px', btnRadius: '12px', contentGap: '20px',
  },
  compact: {
    key: 'compact', label: 'Compact', icon: '▤',
    container: '1000px', sectionPad: 'clamp(40px, 6vw, 80px)',
    cardRadius: '12px', btnRadius: '8px', contentGap: '14px',
  },
  wide: {
    key: 'wide', label: 'Wide', icon: '▰',
    container: '1400px', sectionPad: 'clamp(60px, 10vw, 120px)',
    cardRadius: '20px', btnRadius: '14px', contentGap: '24px',
  },
  magazine: {
    key: 'magazine', label: 'Magazine', icon: '◫',
    container: '1100px', sectionPad: 'clamp(80px, 12vw, 140px)',
    cardRadius: '24px', btnRadius: '16px', contentGap: '28px',
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem('di-theme') || 'midnight'; } catch { return 'midnight'; }
  });
  const [layoutKey, setLayoutKey] = useState(() => {
    try { return localStorage.getItem('di-layout') || 'default'; } catch { return 'default'; }
  });

  const theme = themes[themeKey] || themes.midnight;
  const layout = layouts[layoutKey] || layouts.default;

  useEffect(() => {
    const root = document.documentElement;

    // Color vars
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-light', theme.accentLight);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--bg-elevated', theme.bgElevated);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--grid-color', theme.gridColor);
    root.style.setProperty('--gradient-from', theme.gradientFrom);
    root.style.setProperty('--gradient-to', theme.gradientTo);
    root.style.setProperty('--nav-bg', theme.navBg);
    root.style.setProperty('--surface-tint', theme.surfaceTint);
    root.style.setProperty('--surface-hover', theme.surfaceHover);
    root.style.setProperty('--section-alt', theme.sectionAlt);
    root.style.setProperty('--overlay-bg', theme.overlayBg);
    root.style.setProperty('--glass-bg', theme.glassBg);
    root.style.setProperty('--shadow-color', theme.shadow);
    root.style.setProperty('--input-bg', theme.inputBg);
    root.style.setProperty('--input-text', theme.inputText);
    root.style.setProperty('--text-on-primary', theme.textOnPrimary);
    root.style.setProperty('--muted', theme.muted);

    // Layout vars
    root.style.setProperty('--container', layout.container);
    root.style.setProperty('--section-pad', layout.sectionPad);
    root.style.setProperty('--card-radius', layout.cardRadius);
    root.style.setProperty('--btn-radius', layout.btnRadius);
    root.style.setProperty('--content-gap', layout.contentGap);

    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;

    // Add mode class for CSS overrides
    document.documentElement.setAttribute('data-mode', theme.mode);

    try {
      localStorage.setItem('di-theme', themeKey);
      localStorage.setItem('di-layout', layoutKey);
    } catch {}
  }, [themeKey, theme, layoutKey, layout]);

  return (
    <ThemeContext.Provider value={{
      theme, themeKey, setThemeKey, themes,
      layout, layoutKey, setLayoutKey, layouts,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { themes, layouts };
