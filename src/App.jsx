import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Devices from './pages/Devices';
import DashboardPreview from './pages/DashboardPreview';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

import Whitelisting from './pages/Whitelisting';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <div className="bg-grid" />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/dashboard" element={<DashboardPreview />} />
        <Route path="/whitelisting" element={<Whitelisting />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}
