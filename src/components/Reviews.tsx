import { useI18n } from '../context/i18nContext';
import type { TranslationKey } from '../translations';

const REVIEW_KEYS: TranslationKey[] = ['reviews.r1', 'reviews.r2', 'reviews.r3'];

export default function Reviews() {
  const { t } = useI18n();
  return (
    <section className="section-glass py-24 px-5" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="stars text-xl font-bold">★★★★★</span>
            <span className="text-ga font-bold text-xl">5.0</span>
            <span className="text-mt text-sm">{t('reviews.avg')}</span>
          </div>
          <h2 id="reviews-heading" className="font-serif text-3xl sm:text-4xl text-cr">{t('reviews.h2')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEW_KEYS.map(key => (
            <div key={key} className="card-pub p-7 flex flex-col gap-5 fade-up" style={{ background: '#0A0A0A' }}>
              <div className="stars text-sm">★★★★★</div>
              <blockquote className="flex-1">
                <p className="font-serif text-cr italic text-base leading-relaxed">{t(key)}</p>
              </blockquote>
              <footer className="text-xs text-mt">{t('reviews.attr')}</footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
