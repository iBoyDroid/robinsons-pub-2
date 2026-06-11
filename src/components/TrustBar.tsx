import { Beer, Music, Puzzle, Coffee } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import type { TranslationKey } from '../translations';

const items: { Icon: React.FC<{ className?: string }>; key: TranslationKey }[] = [
  { Icon: Beer,   key: 'trust.guinness' },
  { Icon: Music,  key: 'trust.music'    },
  { Icon: Puzzle, key: 'trust.quiz'     },
  { Icon: Coffee, key: 'trust.coffee'   },
];

export default function TrustBar() {
  const { t } = useI18n();
  return (
    <section className="section-glass-surface border-t-2 border-ga/30" aria-label="Key features">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map(({ Icon, key }) => (
            <div key={key} className="flex flex-col items-center text-center gap-3 fade-up">
              <div className="text-ga" aria-hidden="true"><Icon className="w-7 h-7" /></div>
              <span className="text-sm font-medium text-cr">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
