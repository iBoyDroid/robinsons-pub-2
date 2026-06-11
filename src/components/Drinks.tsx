import { Beer, Wine, Sparkles, Coffee } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import type { TranslationKey } from '../translations';

const drinks: { Icon: React.FC<{ className?: string }>; name: string; nameKey?: TranslationKey; descKey: TranslationKey }[] = [
  { Icon: Beer,     name: 'Guinness',  descKey: 'drinks.guinness_desc'  },
  { Icon: Wine,     name: 'Kilkenny',  descKey: 'drinks.kilkenny_desc'  },
  { Icon: Sparkles, name: '',          nameKey: 'drinks.cocktails', descKey: 'drinks.cocktails_desc' },
  { Icon: Coffee,   name: '',          nameKey: 'drinks.coffee',    descKey: 'drinks.coffee_desc'    },
];

export default function Drinks() {
  const { t } = useI18n();
  return (
    <section id="drinks" className="section-glass-surface py-24 px-5" aria-labelledby="drinks-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <p className="section-label">{t('drinks.label')}</p>
          <h2 id="drinks-heading" className="font-serif text-3xl sm:text-4xl text-cr">{t('drinks.h2')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {drinks.map(({ Icon, name, nameKey, descKey }) => (
            <div key={descKey} className="card-pub p-7 flex flex-col gap-4 fade-up">
              <div className="text-ga" aria-hidden="true"><Icon className="w-7 h-7" /></div>
              <div>
                <h3 className="font-serif text-xl text-cr mb-2">{nameKey ? t(nameKey) : name}</h3>
                <p className="text-sm text-mt leading-relaxed">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
