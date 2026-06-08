import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { LotteryResultCard } from '@/components/lottery/LotteryResultCard';
import { cn } from '@/lib/cn';
import { lotteryTypes, recentResults } from '@/data/seed';
import type { LotteryTypeSlug } from '@/types';

export function Results() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<LotteryTypeSlug | 'all'>('all');

  const filtered = filter === 'all' ? recentResults : recentResults.filter((r) => r.drawType === filter);

  return (
    <>
      <Helmet>
        <title>{t('nav.results')} — {t('site.name')}</title>
      </Helmet>

      <div className="space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-trophy-fill text-brand-red" />
            {t('nav.results')}
          </h1>
          <p className="text-body-md text-text-secondary mt-1">{t('result.latest')}</p>
        </header>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2 rounded-full text-body-md font-semibold transition',
              filter === 'all'
                ? 'bg-brand-red text-text-inverse'
                : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:border-brand-red hover:text-brand-red',
            )}
          >
            {t('common.search')} {/* fallback label */}
          </button>
          {lotteryTypes.map((type) => (
            <button
              key={type.slug}
              onClick={() => setFilter(type.slug)}
              className={cn(
                'px-4 py-2 rounded-full text-body-md font-semibold transition',
                filter === type.slug
                  ? 'text-text-inverse'
                  : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:border-brand-red',
              )}
              style={
                filter === type.slug
                  ? { backgroundColor: type.brandColor }
                  : undefined
              }
            >
              {i18n.language === 'lo' ? type.nameLo : type.nameTh}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, idx) => (
            <LotteryResultCard key={r.id} result={r} isLatest={idx === 0 && filter !== 'all'} />
          ))}
        </div>
      </div>
    </>
  );
}
