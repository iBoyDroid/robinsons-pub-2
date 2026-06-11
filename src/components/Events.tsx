import { Brain, Music2, Leaf, Calendar } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import type { TranslationKey } from '../translations';

const events: {
  Icon: React.FC<{ className?: string }>;
  h3: TranslationKey;
  desc: TranslationKey;
  date: TranslationKey;
}[] = [
  { Icon: Brain,  h3: 'events.quiz_h3',  desc: 'events.quiz_desc',  date: 'events.quiz_date'  },
  { Icon: Music2, h3: 'events.music_h3', desc: 'events.music_desc', date: 'events.music_date' },
  { Icon: Leaf,   h3: 'events.irish_h3', desc: 'events.irish_desc', date: 'events.irish_date' },
];

export default function Events() {
  const { t } = useI18n();
  return (
    <section id="events" className="section-glass py-24 px-5" aria-labelledby="events-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <p className="section-label">{t('events.label')}</p>
          <h2 id="events-heading" className="font-serif text-3xl sm:text-4xl text-cr">{t('events.h2')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(({ Icon, h3, desc, date }) => (
            <div key={h3} className="card-pub event-card-top p-7 flex flex-col gap-5 fade-up" style={{ background: '#0A0A0A' }}>
              <div className="text-ga" aria-hidden="true"><Icon className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-cr mb-2">{t(h3)}</h3>
                <p className="text-sm text-mt leading-relaxed">{t(desc)}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-mt pt-2 border-t border-bd">
                <Calendar className="w-3.5 h-3.5 text-ga" aria-hidden="true" />
                <span>{t(date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
