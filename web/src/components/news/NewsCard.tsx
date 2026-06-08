import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { formatDateLao } from '@/lib/formatDate';
import type { NewsArticle } from '@/types';

type Props = { article: NewsArticle; featured?: boolean };

export function NewsCard({ article, featured }: Props) {
  const { t, i18n } = useTranslation();
  const title = i18n.language === 'lo' ? article.title.lo : article.title.th;
  const excerpt = i18n.language === 'lo' ? article.excerpt.lo : article.excerpt.th;
  const categoryLabel = t(`news.category.${article.category}`);

  return (
    <article
      className={`group rounded-xl overflow-hidden bg-bg-elevated border border-border-subtle hover:shadow-hover transition ${
        featured ? 'lg:flex' : 'flex flex-col'
      }`}
    >
      <Link
        to={`/news/${article.slug}`}
        className={`block overflow-hidden bg-bg-muted ${
          featured ? 'lg:w-1/2 aspect-video lg:aspect-auto' : 'aspect-video'
        }`}
      >
        <img
          src={article.thumbnail}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>
      <div className={`p-4 sm:p-5 space-y-2 ${featured ? 'lg:w-1/2 lg:p-6' : ''}`}>
        <span className="inline-block px-2 py-0.5 rounded-full bg-brand-gold-soft text-brand-gold text-caption font-semibold">
          {categoryLabel}
        </span>
        <h3
          className={`text-text-primary line-clamp-2 group-hover:text-brand-red transition ${
            featured ? 'text-h1' : 'text-h3'
          }`}
        >
          <Link to={`/news/${article.slug}`}>{title}</Link>
        </h3>
        <p className={`text-text-secondary ${featured ? 'text-body-lg line-clamp-3' : 'text-body-md line-clamp-2'}`}>
          {excerpt}
        </p>
        <div className="flex items-center gap-3 text-caption text-text-tertiary pt-1">
          <span>
            <i className="bi bi-person-circle me-1" />
            {article.author}
          </span>
          <span>
            <i className="bi bi-calendar3 me-1" />
            {formatDateLao(article.publishedAt)}
          </span>
          <span>
            <i className="bi bi-clock me-1" />
            {t('news.read_minutes', { n: article.readMinutes })}
          </span>
        </div>
      </div>
    </article>
  );
}
