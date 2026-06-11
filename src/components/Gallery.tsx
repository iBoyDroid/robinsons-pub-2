import IgIcon from './IgIcon';
import { useI18n } from '../context/i18nContext';

const PHOTOS = [1, 2, 3, 4, 5, 6];
const ALTS = [
  "Robinson's Pub atmosphere",
  "Inside Robinson's Pub",
  "Drinks at Robinson's Pub",
  "Live music at Robinson's Pub",
  "Bar at Robinson's Pub",
  "Pub quiz night at Robinson's Pub",
];
const GRADIENTS = [
  'linear-gradient(135deg,#1B5E38,#0A0A0A)',
  'linear-gradient(135deg,#0A0A0A,#1B5E38)',
  'linear-gradient(135deg,#1B5E38,#141414)',
  'linear-gradient(135deg,#141414,#1B5E38)',
  'linear-gradient(135deg,#1B5E38,#0A0A0A)',
  'linear-gradient(135deg,#0A0A0A,#1B5E38)',
];

export default function Gallery() {
  const { t } = useI18n();
  return (
    <section id="gallery" className="section-glass-surface py-24 px-5" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <p className="section-label">{t('gallery.label')}</p>
          <h2 id="gallery-heading" className="font-serif text-3xl sm:text-4xl text-cr">{t('gallery.h2')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PHOTOS.map((n, i) => (
            <div key={n} className="gallery-cell fade-up">
              <img
                src={`assets/images/gallery/photo${n}.jpg`}
                alt={ALTS[i]}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  const p = el.parentElement;
                  if (p) p.style.cssText = `background:${GRADIENTS[i]};display:flex;align-items:center;justify-content:center;`;
                  el.remove();
                }}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="https://instagram.com/robinsons_pub" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-ga hover:text-ga-light transition-colors text-sm font-medium"
             aria-label="Follow Robinson's Pub on Instagram for more photos">
            <IgIcon className="w-4 h-4 flex-shrink-0" />
            <span>{t('gallery.ig')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
