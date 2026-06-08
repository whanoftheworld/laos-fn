import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';

const navItems: { key: string; to: string }[] = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.results', to: '/results' },
  { key: 'nav.live', to: '/live' },
  { key: 'nav.news', to: '/news' },
  { key: 'nav.stats', to: '/stats' },
  { key: 'nav.check', to: '/check' },
  { key: 'nav.schedule', to: '/schedule' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const langs = [
    { code: 'lo', label: 'ລາວ' },
    { code: 'th', label: 'ไทย' },
  ];
  return (
    <div className="inline-flex rounded-full bg-bg-muted p-1 text-caption">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => void i18n.changeLanguage(l.code)}
          className={cn(
            'px-3 py-1 rounded-full transition',
            i18n.language === l.code
              ? 'bg-brand-red text-text-inverse font-semibold'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function TopBar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);

  useEffect(() => {
    const id = setInterval(() => {
      setViewerCount((v) => Math.max(800, v + Math.floor(Math.random() * 21) - 10));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-bg-elevated/95 backdrop-blur border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center gap-3 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-red text-text-inverse shadow-sm">
            <i className="bi bi-broadcast-pin text-lg" />
          </span>
          <div className="hidden sm:block leading-tight">
            <div className="text-h3 font-bold text-text-primary">ຫວຍລາວການເງິນ</div>
            <div className="text-[10px] text-text-tertiary">{t('site.tagline')}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-body-md transition',
                  isActive
                    ? 'bg-brand-red-soft text-brand-red font-semibold'
                    : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
                )
              }
            >
              {t(n.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden md:inline-flex items-center gap-1.5 text-caption text-text-tertiary">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>
              <span className="font-bold text-text-secondary tabular-nums">
                {viewerCount.toLocaleString()}
              </span>{' '}
              {t('common.viewer_count')}
            </span>
          </div>
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg hover:bg-bg-muted"
            aria-label="menu"
          >
            <i className={cn('bi text-xl text-text-secondary', mobileOpen ? 'bi-x-lg' : 'bi-list')} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-border-subtle bg-bg-elevated px-3 py-2">
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-lg text-body-md',
                    isActive
                      ? 'bg-brand-red-soft text-brand-red font-semibold'
                      : 'text-text-secondary hover:bg-bg-muted',
                  )
                }
              >
                {t(n.key)}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
