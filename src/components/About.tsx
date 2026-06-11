import { useI18n } from '../context/i18nContext';

export default function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section-glass py-24 px-5" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="fade-up">
            <p className="section-label">{t('about.label')}</p>
            <h2 id="about-heading" className="font-serif text-3xl sm:text-4xl text-cr leading-snug mb-6">
              {t('about.h2')}
            </h2>
            <p className="text-mt text-base leading-relaxed mb-5">{t('about.p1')}</p>
            <p className="text-mt text-base leading-relaxed mb-8">{t('about.p2')}</p>
            <blockquote className="border-l-2 border-ga pl-5 py-1">
              <p className="font-serif text-lg text-cr italic mb-2">{t('about.quote')}</p>
              <footer className="text-xs text-mt flex items-center gap-2">
                <span className="stars">★★★★★</span>
                <span>{t('reviews.attr')}</span>
              </footer>
            </blockquote>
          </div>

          <div className="fade-up relative">
            <img
              src="assets/images/gallery/interior.jpg"
              alt="Cozy atmosphere inside Robinson's Pub, warm lighting and green walls"
              width="600" height="480"
              loading="lazy"
              className="w-full h-80 lg:h-[420px] object-cover rounded-xl glow-gold"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                if (el.parentElement) el.parentElement.style.background = 'linear-gradient(135deg,#1B5E38,#0A0A0A)';
                el.remove();
              }}
            />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-ga/35 rounded-br-xl pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
