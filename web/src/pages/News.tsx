import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { NewsCard } from '@/components/news/NewsCard';
import { cn } from '@/lib/cn';
import { newsArticles } from '@/data/seed';
import type { NewsCategory } from '@/types';

const categories: (NewsCategory | 'all')[] = [
  'all',
  'announcements',
  'results_recap',
  'winner_stories',
  'regulatory',
  'system_notices',
  'anti_fraud',
  'responsible_play',
];

export function News() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<NewsCategory | 'all'>('all');

  const filtered = filter === 'all' ? newsArticles : newsArticles.filter((n) => n.category === filter);

  return (
    <>
      <Helmet>
        <title>{t('nav.news')} — {t('site.name')}</title>
      </Helmet>

      <div className="space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-newspaper text-brand-red" />
            {t('news.title')}
          </h1>
        </header>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                'px-3 py-1.5 rounded-full text-caption font-semibold transition',
                filter === c
                  ? 'bg-brand-red text-text-inverse'
                  : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:border-brand-red',
              )}
            >
              {c === 'all' ? t('news.categories') : t(`news.category.${c}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-tertiary py-12">{t('common.error')}</p>
        )}
      </div>
    </>
  );
}
