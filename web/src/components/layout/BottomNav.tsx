import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';

const items = [
  { icon: 'house-fill', key: 'nav.home', to: '/' },
  { icon: 'trophy-fill', key: 'nav.results', to: '/results' },
  { icon: 'broadcast', key: 'nav.live', to: '/live' },
  { icon: 'newspaper', key: 'nav.news', to: '/news' },
  { icon: 'search', key: 'nav.check', to: '/check' },
];

export function BottomNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-elevated/95 backdrop-blur border-t border-border-subtle pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {items.map((it) => {
          const active =
            it.to === '/' ? pathname === '/' : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className="flex flex-col items-center justify-center gap-1 active:scale-95 transition"
            >
              <i
                className={cn(
                  `bi bi-${it.icon} text-lg`,
                  active ? 'text-brand-red' : 'text-text-tertiary',
                )}
              />
              <span
                className={cn(
                  'text-[10px]',
                  active ? 'text-brand-red font-semibold' : 'text-text-tertiary',
                )}
              >
                {t(it.key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
