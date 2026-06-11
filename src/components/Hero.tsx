import { ArrowRight } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import IgIcon from './IgIcon';

export default function Hero() {
  const { t } = useI18n();
  return (
    <div id="hero-scroll" style={{ height: '300vh', position: 'relative' }}>
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ position: 'sticky', top: 0, height: '100dvh' }}
        aria-labelledby="hero-heading">

        <div className="hero-overlay absolute inset-0 z-10" />

        <div id="hero-content"
          className="relative z-20 text-center px-5 max-w-3xl mx-auto pt-20 pb-32"
          style={{ opacity: 0, transform: 'translateY(24px)', willChange: 'opacity,transform' }}>
          <p className="section-label mb-5 tracking-widest2">{t('hero.label')}</p>
          <h1 id="hero-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cr leading-[1.15] mb-6"
            dangerouslySetInnerHTML={{ __html: t('hero.h1') }} />
          <p className="text-mt text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t('hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://www.google.com/maps/search/Robinson%27s+Pub+Koper+Stadion+Bonifika"
               target="_blank" rel="noopener noreferrer"
               className="btn-gold w-full sm:w-auto justify-center text-base px-7 py-3.5"
               aria-label="Find us on Google Maps">
              <span>{t('nav.findus')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/robinsons_pub"
               target="_blank" rel="noopener noreferrer"
               className="btn-outline w-full sm:w-auto justify-center text-base px-7 py-3.5"
               aria-label="Follow Robinson's Pub on Instagram">
              <IgIcon className="w-4 h-4 flex-shrink-0" />
              <span>{t('hero.cta_ig')}</span>
            </a>
          </div>
        </div>

        <div className="badge-enter absolute bottom-28 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-ps/80 backdrop-blur-sm border border-bd rounded-lg px-3 py-2"
          style={{ opacity: 0, transform: 'translateY(8px)' }}>
          <span className="stars text-sm font-bold">★ 5.0</span>
          <span className="text-xs text-mt">Google Maps</span>
        </div>

        <div id="scroll-cue"
          className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2"
          aria-hidden="true" style={{ opacity: 0.5 }}>
          <span className="text-xs text-mt tracking-[0.2em] uppercase">{t('hero.scroll')}</span>
          <svg className="w-7 h-7 text-mt animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>
    </div>
  );
}
