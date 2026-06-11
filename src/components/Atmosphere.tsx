import { Quote } from 'lucide-react';
import { useI18n } from '../context/i18nContext';

export default function Atmosphere() {
  const { t } = useI18n();
  return (
    <section className="pattern-diag section-glass-green py-20 px-5" aria-label="Guest review highlight">
      <div className="max-w-2xl mx-auto text-center fade-up">
        <div className="text-cr/40 mb-5" aria-hidden="true">
          <Quote className="w-9 h-9 mx-auto" />
        </div>
        <blockquote>
          <p className="font-serif text-2xl sm:text-3xl text-cr italic leading-relaxed mb-5">
            {t('atmo.quote')}
          </p>
          <footer className="text-sm text-cr/70 flex items-center justify-center gap-2">
            <span className="stars">★★★★★</span>
            <span>{t('atmo.attr')}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
