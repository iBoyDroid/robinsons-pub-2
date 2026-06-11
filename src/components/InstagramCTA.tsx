import IgIcon from './IgIcon';
import { useI18n } from '../context/i18nContext';

export default function InstagramCTA() {
  const { t } = useI18n();
  return (
    <section className="pattern-diag section-glass-green py-20 px-5" aria-labelledby="ig-cta-heading">
      <div className="max-w-xl mx-auto text-center fade-up">
        <div className="text-cr/50 mb-5" aria-hidden="true">
          <IgIcon className="w-10 h-10 mx-auto" />
        </div>
        <h2 id="ig-cta-heading" className="font-serif text-3xl sm:text-4xl text-cr mb-4">{t('ig.h2')}</h2>
        <p className="text-cr/75 text-base mb-8 leading-relaxed">{t('ig.desc')}</p>
        <a href="https://instagram.com/robinsons_pub" target="_blank" rel="noopener noreferrer"
           className="btn-gold px-8 py-3.5 text-base"
           aria-label="Follow Robinson's Pub on Instagram">
          <IgIcon className="w-4 h-4 flex-shrink-0" />
          <span>{t('hero.cta_ig')}</span>
        </a>
      </div>
    </section>
  );
}
