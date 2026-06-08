import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NewsCard } from '@/components/news/NewsCard';
import { formatDateLao } from '@/lib/formatDate';
import { newsArticles } from '@/data/seed';

export function NewsDetail() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-h2 text-text-primary">404</p>
        <Link to="/news" className="text-brand-red mt-3 inline-block hover:underline">
          {t('common.back')}
        </Link>
      </div>
    );
  }

  const title = i18n.language === 'lo' ? article.title.lo : article.title.th;
  const body = i18n.language === 'lo' ? article.body.lo : article.body.th;
  const related = newsArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{title} — {t('site.name')}</title>
        <meta name="description" content={i18n.language === 'lo' ? article.excerpt.lo : article.excerpt.th} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={article.thumbnail} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: title,
            image: article.thumbnail,
            datePublished: article.publishedAt,
            author: { '@type': 'Person', name: article.author },
            publisher: {
              '@type': 'Organization',
              name: 'LAOS-Finance',
            },
          })}
        </script>
      </Helmet>

      <article className="max-w-3xl mx-auto space-y-5">
        <Link to="/news" className="inline-flex items-center gap-1 text-body-md text-text-secondary hover:text-brand-red">
          <i className="bi bi-arrow-left" /> {t('nav.news')}
        </Link>

        <span className="inline-block px-2 py-0.5 rounded-full bg-brand-gold-soft text-brand-gold text-caption font-semibold">
          {t(`news.category.${article.category}`)}
        </span>

        <h1 className="text-h1 sm:text-display-lg text-text-primary leading-tight">{title}</h1>

        <div className="flex items-center gap-4 text-caption text-text-tertiary">
          <span><i className="bi bi-person-circle me-1" />{article.author}</span>
          <span><i className="bi bi-calendar3 me-1" />{formatDateLao(article.publishedAt)}</span>
          <span><i className="bi bi-clock me-1" />{t('news.read_minutes', { n: article.readMinutes })}</span>
        </div>

        <img
          src={article.thumbnail}
          alt={title}
          className="w-full rounded-2xl object-cover aspect-video"
        />

        <div className="prose-content space-y-4 text-body-lg text-text-primary leading-relaxed">
          {body.split('\n\n').map((para, i) => (
            <p key={i} className="whitespace-pre-line">{para}</p>
          ))}
        </div>

        <div className="rounded-xl bg-warning-soft border border-warning/30 p-4 text-caption text-text-secondary">
          <i className="bi bi-info-circle me-1 text-warning" />
          {i18n.language === 'lo'
            ? 'ຂໍ້ມູນເພື່ອການໃຫ້ຂໍ້ມູນເທົ່ານັ້ນ ບໍ່ແມ່ນຄຳແນະນຳໃນການເສ່ຍໂຊກ'
            : 'ข้อมูลเพื่อการให้ข้อมูลเท่านั้น ไม่ใช่คำแนะนำในการเสี่ยงโชค'}
        </div>
      </article>

      <section className="mt-12 max-w-7xl mx-auto">
        <h2 className="text-h2 text-text-primary mb-4">{t('news.latest')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
