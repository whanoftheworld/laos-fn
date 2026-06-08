import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LiveStreamHero } from '@/components/home/LiveStreamHero';
import { LiveChat } from '@/components/home/LiveChat';
import { QuickCheckBar } from '@/components/home/QuickCheckBar';
import { ServiceGrid } from '@/components/home/ServiceGrid';
import { DrawCountdown } from '@/components/lottery/DrawCountdown';
import { LotteryResultCard } from '@/components/lottery/LotteryResultCard';
import { NewsCard } from '@/components/news/NewsCard';
import { useMatchedHeight } from '@/lib/useMatchedHeight';
import {
  getLatestLiveStream,
  getNextDraw,
  newsArticles,
  recentResults,
  upcomingStreams,
} from '@/data/seed';

export function Home() {
  const { t } = useTranslation();
  const liveStream = getLatestLiveStream() ?? upcomingStreams[0];
  const next = getNextDraw();
  const latest3Results = recentResults.slice(0, 3);
  const featuredNews = newsArticles[0];
  const otherNews = newsArticles.slice(1, 7);
  const { sourceRef: streamRef, height: streamHeight } = useMatchedHeight<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>{t('site.name')} — {t('site.tagline')}</title>
        <meta name="description" content={t('site.tagline')} />
      </Helmet>

      <div className="space-y-8 sm:space-y-10">
        {/* Hero: Live + Chat — chat wrapper height locked to live stream natural height */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div ref={streamRef} className="lg:col-span-2">
            <LiveStreamHero stream={liveStream} />
          </div>
          <div
            className="lg:col-span-1 h-[480px] lg:h-auto"
            style={streamHeight ? { height: `${streamHeight}px` } : undefined}
          >
            <LiveChat />
          </div>
        </section>

        {/* Countdown + Quick Check */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {next ? <DrawCountdown targetDate={next.at} /> : null}
          </div>
          <div className="lg:col-span-2">
            <QuickCheckBar />
          </div>
        </section>

        {/* Latest results */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h2 text-text-primary flex items-center gap-2">
              <i className="bi bi-trophy-fill text-brand-red" />
              {t('result.latest')}
            </h2>
            <Link
              to="/results"
              className="text-body-md text-brand-red font-semibold hover:underline"
            >
              {t('result.see_all')} <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest3Results.map((r, idx) => (
              <LotteryResultCard key={r.id} result={r} isLatest={idx === 0} />
            ))}
          </div>
        </section>

        {/* Service Grid */}
        <ServiceGrid />

        {/* News Feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h2 text-text-primary flex items-center gap-2">
              <i className="bi bi-newspaper text-brand-red" />
              {t('news.title')}
            </h2>
            <Link
              to="/news"
              className="text-body-md text-brand-red font-semibold hover:underline"
            >
              {t('news.see_all')} <i className="bi bi-arrow-right" />
            </Link>
          </div>

          {featuredNews && <NewsCard article={featuredNews} featured />}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherNews.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
