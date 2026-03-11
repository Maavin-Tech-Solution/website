import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Fade up on scroll ── */
export function FadeIn({ children, delay = 0, duration = 0.7, y = 40, ...props }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale in on scroll ── */
export function ScaleIn({ children, delay = 0, duration = 0.6, ...props }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide in from left / right ── */
export function SlideIn({ children, direction = 'left', delay = 0, ...props }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const x = direction === 'left' ? -60 : 60;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered children ── */
export function StaggerContainer({ children, stagger = 0.1, delay = 0, ...props }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Floating animation (continuous) ── */
export function Float({ children, amplitude = 10, duration = 4, ...props }) {
  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Rotating glow orb ── */
export function GlowOrb({ size = 400, color = 'var(--primary)', x = '50%', y = '50%', opacity = 0.15 }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${size / 3}px)`,
        opacity,
        left: x, top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
}

/* ── Counting number animation ── */
export function CountUp({ target, duration = 2, suffix = '', prefix = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {prefix}
          <CountUpInner target={target} duration={duration} />
          {suffix}
        </motion.span>
      ) : `${prefix}0${suffix}`}
    </motion.span>
  );
}

function CountUpInner({ target, duration }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [target, duration]);
  return <>{val.toLocaleString()}</>;
}

/* ── Section heading ── */
export function SectionHeading({ badge, title, subtitle }) {
  return (
    <FadeIn style={{ textAlign: 'center', marginBottom: 60, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
      {badge && <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>{badge}</span>}
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{subtitle}</p>}
    </FadeIn>
  );
}
