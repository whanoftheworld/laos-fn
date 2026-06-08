import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { numberStats } from '@/data/seed';

export function Stats() {
  const { t } = useTranslation();
  const maxFreq = Math.max(...numberStats.map((s) => s.frequency));

  return (
    <>
      <Helmet>
        <title>{t('stats.title')} — {t('site.name')}</title>
      </Helmet>

      <div className="space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-bar-chart-fill text-brand-red" />
            {t('stats.title')}
          </h1>
        </header>

        <section className="rounded-2xl bg-bg-elevated border border-border-subtle shadow-card p-5">
          <h2 className="text-h2 text-text-primary mb-4 flex items-center gap-2">
            <i className="bi bi-fire text-danger" /> {t('stats.hot')}
          </h2>
          <div className="space-y-3">
            {numberStats.map((s) => (
              <div key={s.number} className="flex items-center gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-gold text-text-inverse font-bold text-caption shrink-0">
                  {s.rank}
                </span>
                <span className="font-mono text-result-sm text-text-primary tabular-nums w-20">
                  {s.number}
                </span>
                <div className="flex-1 h-3 rounded-full bg-bg-muted overflow-hidden">
                  <div
                    className="h-full bg-brand-red rounded-full"
                    style={{ width: `${(s.frequency / maxFreq) * 100}%` }}
                  />
                </div>
                <span className="text-caption text-text-secondary w-32 text-right">
                  {t('stats.frequency')}: <strong className="text-brand-red">{s.frequency}</strong>
                  {' · '}
                  {t('stats.draws_ago', { n: s.lastSeenDrawsAgo })}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl bg-warning-soft border border-warning/30 p-4 text-caption text-text-secondary">
          <i className="bi bi-info-circle me-1 text-warning" />
          {t('check.disclaimer', { source: 'ສະຖິຕິການອອກຫວຍ' })}
        </div>
      </div>
    </>
  );
}
