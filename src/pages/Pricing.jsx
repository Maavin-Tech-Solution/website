import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn, GlowOrb, SectionHeading, CountUp } from '../components/Animations';
import { HiCheck, HiLightningBolt, HiStar, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 119,
    period: '/vehicle/month',
    desc: 'For small fleets getting started with GPS tracking.',
    color: '#64748b',
    features: [
      'Up to 10 vehicles',
      'Real-time GPS tracking',
      'GT06 / WeTrack2 support',
      'Basic trip reports',
      'Email alerts',
      '7-day data retention',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: 239,
    period: '/vehicle/month',
    desc: 'For growing fleets that need full visibility and control.',
    color: '#3b82f6',
    features: [
      'Up to 100 vehicles',
      'All device types supported',
      'Full trip, stop & speed reports',
      'Speed violation tracking',
      'Location playback (30 days)',
      'RTO & challan integration',
      'Multi-user & client management',
      '90-day data retention',
      'Priority email support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    period: 'Custom',
    desc: 'For large operations with custom requirements.',
    color: '#8b5cf6',
    features: [
      'Unlimited vehicles',
      'All device types + custom protocols',
      'Advanced analytics & BI dashboards',
      'White-label option',
      'API access (REST + WebSocket)',
      'Custom alert rules & workflows',
      'Dedicated account manager',
      '1-year data retention',
      '24/7 phone + chat support',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  { q: 'What GPS devices are supported?', a: 'DriveInnovate supports GT06, GT06N, WeTrack2 (GT06 protocol), FMB125, FMB920, FMB130, FMB140 (Teltonika Codec 8/8E), and TK103 (ASCII). New device support is added regularly.' },
  { q: 'How does the free trial work?', a: 'The Professional plan comes with a 14-day free trial. No credit card required. You can connect up to 5 vehicles and access all Professional features during the trial.' },
  { q: 'Can I switch plans later?', a: 'Yes! You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. No lock-in contracts.' },
  { q: 'Is my data secure?', a: 'All data is encrypted in transit (TLS 1.3) and at rest. GPS data is stored in MongoDB Atlas with automatic backups. User authentication uses JWT with bcrypt password hashing.' },
  { q: 'Do you support custom device protocols?', a: 'Enterprise plans include custom protocol integration. We can parse any TCP/UDP protocol and normalize the data into the DriveInnovate platform.' },
  { q: 'What about on-premise deployment?', a: 'Enterprise customers can deploy DriveInnovate on their own infrastructure. The stack runs on Node.js with MongoDB and MySQL, making it portable to any cloud or bare-metal server.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main style={{ paddingTop: 120 }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingBottom: 20 }}>
        <GlowOrb size={500} color="#3b82f6" x="50%" y="10%" opacity={0.06} />
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              <HiStar /> Pricing
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
              Pay per vehicle, scale as you grow. No hidden fees, no surprises.
            </p>
          </FadeIn>

          {/* Toggle */}
          <FadeIn delay={0.3}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 32 }}>
              <span style={{ fontSize: 14, fontWeight: annual ? 400 : 600, color: annual ? 'var(--text-secondary)' : 'var(--text)' }}>Monthly</span>
              <div
                onClick={() => setAnnual(!annual)}
                style={{
                  width: 52, height: 28, borderRadius: 14, padding: 3,
                  background: annual ? 'var(--primary)' : 'var(--surface-hover)',
                  cursor: 'pointer', transition: 'background 0.3s',
                  position: 'relative',
                }}
              >
                <motion.div
                  animate={{ x: annual ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff' }}
                />
              </div>
              <span style={{ fontSize: 14, fontWeight: annual ? 600 : 400, color: annual ? 'var(--text)' : 'var(--text-secondary)' }}>
                Annual <span style={{ color: '#10b981', fontSize: 12, fontWeight: 700 }}>save 20%</span>
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <ScaleIn key={plan.name} delay={i * 0.12}>
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 20,
                  padding: 32,
                  border: plan.popular ? `2px solid ${plan.color}` : '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {plan.popular && (
                    <div style={{
                      position: 'absolute', top: 16, right: -30,
                      background: plan.color, color: 'var(--text-on-primary)',
                      padding: '4px 40px', fontSize: 11, fontWeight: 700,
                      transform: 'rotate(35deg)', letterSpacing: '0.08em',
                    }}>POPULAR</div>
                  )}

                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{plan.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>{plan.desc}</p>

                  <div style={{ marginBottom: 24 }}>
                    {plan.price !== null ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>₹</span>
                        <span style={{ fontSize: 42, fontWeight: 900, fontFamily: 'var(--font-display)' }}>
                          {annual ? Math.round(plan.price * 0.8) : plan.price}
                        </span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{plan.period}</span>
                      </div>
                    ) : (
                      <div style={{ fontSize: 42, fontWeight: 900, fontFamily: 'var(--font-display)' }}>Custom</div>
                    )}
                  </div>

                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '12px 0',
                        borderRadius: 12, border: plan.popular ? 'none' : '1px solid var(--border)',
                        background: plan.popular ? `linear-gradient(135deg, ${plan.color}, var(--accent))` : 'transparent',
                        color: plan.popular ? 'var(--text-on-primary)' : 'var(--text)', fontWeight: 700, fontSize: 14,
                        cursor: 'pointer', fontFamily: 'var(--font-display)',
                        marginBottom: 24,
                      }}
                    >{plan.cta}</motion.button>
                  </Link>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <HiCheck color={plan.color || '#10b981'} size={16} style={{ flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--section-alt)' }}>
        <div className="container" style={{ maxWidth: 740 }}>
          <SectionHeading
            badge="FAQ"
            title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 40 }}>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  style={{
                    background: 'var(--bg-card)', borderRadius: 14,
                    border: '1px solid var(--border)', overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '16px 20px', border: 'none', background: 'none',
                      color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'var(--font-display)', textAlign: 'left',
                    }}
                  >
                    {faq.q}
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      style={{ fontSize: 20, color: 'var(--text-secondary)', flexShrink: 0 }}
                    >+</motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 20px 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
