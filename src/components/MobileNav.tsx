import React, { useState, useRef, useEffect } from 'react';
import { Home, Beer, Calendar, Image, Clock } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import type { TranslationKey } from '../translations';

type IconComponentType = React.ElementType<{ className?: string }>;

interface NavItem {
  labelKey: TranslationKey;
  icon: IconComponentType;
  sectionId: string | null;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.home',    icon: Home,     sectionId: null,      href: '#'        },
  { labelKey: 'nav.drinks',  icon: Beer,     sectionId: 'drinks',  href: '#drinks'  },
  { labelKey: 'nav.events',  icon: Calendar, sectionId: 'events',  href: '#events'  },
  { labelKey: 'nav.gallery', icon: Image,    sectionId: 'gallery', href: '#gallery' },
  { labelKey: 'nav.hours',   icon: Clock,    sectionId: 'hours',   href: '#hours'   },
];

export default function MobileNav() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  // Prevents the IntersectionObserver from overriding a user's explicit tap for 800ms
  const clickLockRef = useRef(false);
  const clickLockTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Measure actual text width for the underline.
  // scrollWidth gives the full content width even while max-width transition is still at 0.
  useEffect(() => {
    const measure = () => {
      const el = textRefs.current[activeIndex];
      if (el) setLineWidth(el.scrollWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex]);

  // Scroll-based active detection via IntersectionObserver
  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(item =>
      item.sectionId ? document.getElementById(item.sectionId) : null
    );
    const observer = new IntersectionObserver((entries) => {
      if (clickLockRef.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // sectionEls[i] maps directly to NAV_ITEMS[i], so no +1 offset
          const idx = sectionEls.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sectionEls.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  function handleNavClick(index: number) {
    setActiveIndex(index);
    clickLockRef.current = true;
    clearTimeout(clickLockTimerRef.current);
    clickLockTimerRef.current = setTimeout(() => {
      clickLockRef.current = false;
    }, 800);
  }

  return (
    <nav
      className="menu sm:hidden fixed z-50"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map(({ labelKey, icon: Icon, href }, index) => {
        const isActive = index === activeIndex;
        return (
          <a
            key={labelKey}
            href={href}
            className={`menu__item${isActive ? ' active' : ''}`}
            style={{ '--lineWidth': isActive ? `${lineWidth}px` : '0px' } as React.CSSProperties}
            onClick={() => handleNavClick(index)}
          >
            <div className="menu__icon">
              <Icon className="w-5 h-5" />
            </div>
            <strong
              className={`menu__text${isActive ? ' active' : ''}`}
              ref={(el) => { textRefs.current[index] = el; }}
            >
              {t(labelKey)}
            </strong>
          </a>
        );
      })}
    </nav>
  );
}
