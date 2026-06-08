import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useTranslation } from 'react-i18next';

import { LiveBadge } from '@/components/lottery/LiveBadge';
import { getLotteryType } from '@/data/seed';
import type { StreamSchedule } from '@/types';

type Props = { stream: StreamSchedule };

export function LiveStreamHero({ stream }: Props) {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const type = getLotteryType(stream.drawType);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream.streamUrl) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = stream.streamUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(stream.streamUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [stream.streamUrl]);

  const title = i18n.language === 'lo' ? stream.title.lo : stream.title.th;

  return (
    <div className="rounded-2xl overflow-hidden bg-bg-elevated border border-border-subtle shadow-card">
      <div className="relative aspect-video bg-black">
        {stream.streamUrl ? (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-text-inverse text-center p-6">
            <div>
              <i className="bi bi-broadcast text-5xl mb-3 opacity-70" />
              <p className="text-h2">{t('live.offline')}</p>
              <p className="text-body-md opacity-80">{t('live.next_draw')}</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <LiveBadge isLive={stream.status === 'live'} viewerCount={stream.viewerCount} />
        </div>
        {type && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-text-inverse text-caption font-bold shadow-sm"
            style={{ backgroundColor: type.brandColor }}
          >
            {i18n.language === 'lo' ? type.nameLo : type.nameTh}
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <h2 className="text-h2 text-text-primary leading-tight">{title}</h2>
        <p className="mt-1 text-body-md text-text-secondary">
          <i className="bi bi-shield-check text-success me-1" />
          {t('result.official_source')}: {type ? (i18n.language === 'lo' ? type.nameLo : type.nameTh) : ''}
        </p>
      </div>
    </div>
  );
}
