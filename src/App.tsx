import { useEffect } from 'react';
import FrameCanvas from './components/FrameCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Atmosphere from './components/Atmosphere';
import Drinks from './components/Drinks';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Hours from './components/Hours';
import InstagramCTA from './components/InstagramCTA';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Fade-up scroll animation
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-up');
    if (!fadeEls.length) return;
    if (!('IntersectionObserver' in window)) {
      fadeEls.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 45}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Instagram gradient — referenced as fill="url(#ig-grad)" in IgIcon */}
      <svg aria-hidden="true" focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#f09433" />
            <stop offset="25%"  stopColor="#e6683c" />
            <stop offset="50%"  stopColor="#dc2743" />
            <stop offset="75%"  stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      <FrameCanvas />
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />

      <main id="main">
        <Hero />
        <TrustBar />
        <About />
        <Atmosphere />
        <Drinks />
        <Events />
        <Gallery />
        <Reviews />
        <Hours />
        <InstagramCTA />
      </main>

      <Footer />
      <MobileNav />
    </>
  );
}
