import React from 'react';
import { FadeIn, SectionHeading } from '../components/Animations';
import { HiShieldCheck, HiDocumentReport, HiCog, HiMail, HiGlobeAlt, HiPhotograph } from 'react-icons/hi';

export default function Whitelisting() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="section" style={{ textAlign: 'center' }}>
        <SectionHeading
          badge="Whitelisting & Lease Service"
          title={<><span className="gradient-text">Custom Branding & Client Domains</span></>}
          subtitle="Offer your clients a fully branded experience with custom logo, domain, copyright, favicon, and SMTP mail configuration."
        />
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, marginTop: 40 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiShieldCheck size={36} style={{ color: '#22d3ee', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Whitelisting & Lease Service</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Restrict access to your own branded platform, manage leases, and control client domains.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiPhotograph size={36} style={{ color: '#a21caf', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Custom Logo & Favicon</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Upload your own logo and favicon for a unique client experience.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiGlobeAlt size={36} style={{ color: '#3b82f6', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Client Domain</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Each client gets their own domain for login and dashboard access.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiMail size={36} style={{ color: '#f59e0b', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>SMTP Mail Configuration</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Configure SMTP for client-specific email notifications and alerts.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiCog size={36} style={{ color: '#10b981', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Copyright & Legal</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Set copyright and legal info for each client, ensuring compliance and brand protection.</p>
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
              <HiDocumentReport size={36} style={{ color: '#06b6d4', marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Lease Management</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>Easily manage lease terms, renewals, and client access from a central dashboard.</p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
