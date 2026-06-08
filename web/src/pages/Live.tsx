import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { LiveStreamHero } from '@/components/home/LiveStreamHero';
import { LiveChat } from '@/components/home/LiveChat';
import { DrawCountdown } from '@/components/lottery/DrawCountdown';
import { formatDateTimeLao } from '@/lib/formatDate';
import { useMatchedHeight } from '@/lib/useMatchedHeight';
import { getLatestLiveStream, getLotteryType, upcomingStreams } from '@/data/seed';

export function Live() {
  const { t, i18n } = useTranslation();
  const live = getLatestLiveStream() ?? upcomingStreams[0];
  const scheduled = upcomingStreams.filter((s) => s.status === 'scheduled');
  const { sourceRef: streamRef, height: streamHeight } = useMatchedHeight<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>{t('nav.live')} — {t('site.name')}</title>
        <meta name="description" content={t('live.live_now')} />
      </Helmet>

      <div className="space-y-8">
        <h1 className="text-h1 text-text-primary flex items-center gap-2">
          <i className="bi bi-broadcast text-brand-red" />
          {live.status === 'live' ? t('live.live_now') : t('live.next_draw')}
        </h1>

        <div className="grid gap-4 lg:grid-cols-3">
          <div ref={streamRef} className="lg:col-span-2">
            <LiveStreamHero stream={live} />
          </div>
          <div
            className="lg:col-span-1 h-[480px] lg:h-auto"
            style={streamHeight ? { height: `${streamHeight}px` } : undefined}
          >
            <LiveChat />
          </div>
        </div>

        <section>
          <h2 className="text-h2 text-text-primary mb-4">{t('live.next_draw')}</h2>
          {scheduled.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {scheduled.map((s) => {
                const type = getLotteryType(s.drawType);
                return (
                  <div
                    key={s.id}
                    className="p-5 rounded-2xl bg-bg-elevated border border-border-subtle"
                  >
                    {type && (
                      <p
                        className="text-overline mb-1"
                        style={{ color: type.brandColor }}
                      >
                        {i18n.language === 'lo' ? type.nameLo : type.nameTh}
                      </p>
                    )}
                    <p className="text-h3 text-text-primary">
                      {i18n.language === 'lo' ? s.title.lo : s.title.th}
                    </p>
                    <p className="text-body-md text-text-secondary mt-1">
                      <i className="bi bi-clock me-1" />
                      {formatDateTimeLao(s.scheduledAt)}
                    </p>
                    <div className="mt-3">
                      <DrawCountdown targetDate={s.scheduledAt} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-body-md text-text-tertiary">—</p>
          )}
        </section>
      </div>
    </>
  );
}
