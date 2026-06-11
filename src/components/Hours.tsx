import { Clock, MapPin } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GMapPin from './GMapPin';
import type { TranslationKey } from '../translations';

interface HourRow {
  dayKey: TranslationKey;
  time: string;
  alt: boolean;
  special: boolean;
}

const ROWS: HourRow[] = [
  { dayKey: 'hours.mon', time: '09:00 – 00:00', alt: true,  special: false },
  { dayKey: 'hours.tue', time: '09:00 – 00:00', alt: false, special: false },
  { dayKey: 'hours.wed', time: '09:00 – 00:00', alt: true,  special: false },
  { dayKey: 'hours.thu', time: '09:00 – 00:00', alt: false, special: false },
  { dayKey: 'hours.fri', time: '09:00 – 02:00', alt: true,  special: true  },
  { dayKey: 'hours.sat', time: '09:00 – 02:00', alt: false, special: true  },
  { dayKey: 'hours.sun', time: '10:00 – 22:00', alt: true,  special: false },
];

export default function Hours() {
  const { t } = useI18n();
  return (
    <section id="hours" className="section-glass-surface py-24 px-5" aria-labelledby="hours-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <p className="section-label">{t('hours.label')}</p>
          <h2 id="hours-heading" className="font-serif text-3xl sm:text-4xl text-cr">{t('hours.h2')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="fade-up">
            <h3 className="font-serif text-xl text-cr mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-ga" aria-hidden="true" />
              <span>{t('hours.opening')}</span>
            </h3>
            <table className="w-full text-sm border-collapse" role="table" aria-label="Robinson's Pub opening hours">
              <thead>
                <tr>
                  <th scope="col" className="text-left py-2.5 px-4 text-xs text-ga tracking-widest uppercase font-semibold">{t('hours.day')}</th>
                  <th scope="col" className="text-right py-2.5 px-4 text-xs text-ga tracking-widest uppercase font-semibold">{t('hours.time')}</th>
                </tr>
              </thead>
              <tbody className="border-t border-bd">
                {ROWS.map(({ dayKey, time, alt, special }) => (
                  <tr key={dayKey} className={`border-b border-bd${alt ? ' hours-alt' : ''}`}>
                    <td className={`py-3.5 px-4 text-cr${special ? ' font-medium' : ''}`}>{t(dayKey)}</td>
                    <td className={`py-3.5 px-4 text-right tabular-nums${special ? ' text-ga font-semibold' : ' text-mt'}`}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fade-up">
            <h3 className="font-serif text-xl text-cr mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-ga" aria-hidden="true" />
              <span>{t('nav.findus')}</span>
            </h3>
            <div className="rounded-xl overflow-hidden mb-6 border border-bd" style={{ height: '260px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Stadion+Bonifika,+Ljubljanska+cesta+2A,+6000+Koper,+Slovenia&output=embed&zoom=16"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Robinson's Pub location on Google Maps"
                aria-label="Interactive map showing Robinson's Pub at Stadion Bonifika, Koper"
              />
            </div>
            <address className="not-italic text-sm text-mt space-y-3 mb-6">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ga mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Stadion Bonifika, Ljubljanska cesta 2A,<br />6000 Koper, Slovenia</span>
              </p>
            </address>
            <a href="https://www.google.com/maps/search/Robinson%27s+Pub+Koper+Stadion+Bonifika"
               target="_blank" rel="noopener noreferrer"
               className="btn-gold"
               aria-label="Get directions to Robinson's Pub on Google Maps">
              <GMapPin className="w-4 h-4 flex-shrink-0" />
              <span>{t('hours.getdir')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
