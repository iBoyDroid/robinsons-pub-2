import { useState, useEffect, Fragment } from 'react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GMapPin from './GMapPin';
import type { Lang } from '../translations';

const NAV_KEYS = ['about', 'drinks', 'events', 'gallery', 'hours'] as const;
const LANGS: Lang[] = ['sl', 'en', 'it'];

export default function Navbar() {
  const { t, lang, setLanguage } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false); };
    const handleClick = (e: MouseEvent) => {
      const nav = document.getElementById('navbar');
      if (menuOpen && nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleClick);
    };
  }, [menuOpen]);

  const LangSwitcher = ({ isMobile }: { isMobile?: boolean }) => (
    <div className={isMobile ? 'flex items-center gap-1' : 'hidden sm:flex items-center'} role="group" aria-label="Language selector">
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className="lang-sep">|</span>}
          <button className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => setLanguage(l)}>
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );

  return (
    <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50${scrolled ? ' scrolled' : ''}`}
      role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="#" className="flex items-center gap-3 min-h-[44px]" aria-label="Robinson's Pub, back to top">
            <img src="assets/images/logo/logo.jpg" alt="Robinson's Pub logo" width="40" height="40"
              className="w-10 h-10 rounded-full object-cover border border-bd"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="font-serif text-lg text-cr navbar-pub-name">Robinson's Pub</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_KEYS.map(key => (
              <a key={key} href={`#${key}`} className="text-sm text-mt hover:text-cr transition-colors duration-200">
                {t(`nav.${key}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LangSwitcher />
            <a href="https://www.google.com/maps/search/Robinson%27s+Pub+Koper+Stadion+Bonifika"
               target="_blank" rel="noopener noreferrer"
               className="btn-gold text-sm hidden sm:inline-flex"
               aria-label="Find us on Google Maps">
              <GMapPin className="w-4 h-4 flex-shrink-0" />
              <span>{t('nav.findus')}</span>
            </a>
            <button
              id="menu-toggle"
              className="md:hidden p-2 rounded-md text-mt hover:text-cr transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" role="region" aria-label="Mobile navigation">
          <div className="px-5 py-5 flex flex-col gap-1">
            {NAV_KEYS.map(key => (
              <a key={key} href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-mt hover:text-cr py-3 min-h-[44px] flex items-center transition-colors">
                {t(`nav.${key}`)}
              </a>
            ))}
            <div className="pt-3 border-t border-bd mt-2">
              <LangSwitcher isMobile />
            </div>
            <div className="pt-3 border-t border-bd mt-2">
              <a href="https://www.google.com/maps/search/Robinson%27s+Pub+Koper+Stadion+Bonifika"
                 target="_blank" rel="noopener noreferrer"
                 className="btn-gold w-full justify-center"
                 aria-label="Get directions on Google Maps">
                <GMapPin className="w-4 h-4 flex-shrink-0" />
                <span>{t('nav.findus_maps')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
