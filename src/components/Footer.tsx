import { MapPin, Mail } from 'lucide-react';
import IgIcon from './IgIcon';
import { useI18n } from '../context/i18nContext';

const NAV_KEYS = ['about', 'drinks', 'events', 'gallery', 'hours'] as const;

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="section-glass-footer border-t border-bd py-16 px-5" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">

          <div>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <img src="assets/images/logo/logo.jpg" alt="" aria-hidden="true" width="36" height="36"
                className="w-9 h-9 rounded-full object-cover border border-bd"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="font-serif text-lg text-cr">Robinson's Pub</span>
            </div>
            <p className="text-sm text-mt leading-relaxed max-w-xs mx-auto md:mx-0">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-cr uppercase tracking-widest mb-5">{t('footer.nav')}</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 text-sm text-mt flex flex-col items-center md:items-start">
                {NAV_KEYS.map(key => (
                  <li key={key}>
                    <a href={`#${key}`} className="hover:text-cr transition-colors">{t(`nav.${key}`)}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-cr uppercase tracking-widest mb-5">{t('footer.contact')}</h3>
            <address className="not-italic text-sm text-mt space-y-3">
              <p className="flex items-start gap-2.5 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-ga mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Stadion Bonifika, Ljubljanska cesta 2A,<br />6000 Koper, Slovenia</span>
              </p>
              <p className="flex items-center gap-2.5 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-ga flex-shrink-0" aria-hidden="true" />
                <a href="mailto:jubilee@duks.si" className="hover:text-cr transition-colors">jubilee@duks.si</a>
              </p>
              <p className="flex items-center gap-2.5 justify-center md:justify-start">
                <IgIcon className="w-4 h-4 flex-shrink-0" />
                <a href="https://instagram.com/robinsons_pub" target="_blank" rel="noopener noreferrer"
                   className="hover:text-cr transition-colors">@robinsons_pub</a>
              </p>
            </address>
            <div className="mt-5 text-xs text-mt space-y-1 leading-relaxed">
              <p>{t('footer.hours1')}</p>
              <p>{t('footer.hours2')}</p>
              <p>{t('footer.hours3')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-bd pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mt">
          <p>{t('footer.copy')}</p>
          <p className="flex items-center gap-1.5">
            <span className="stars">★</span>
            <span>{t('footer.rating')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
