import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';
import { formatDateLao, formatKip } from '@/lib/formatDate';
import type { LotteryResult, PrizeTier } from '@/types';
import { getLotteryType } from '@/data/seed';

type Props = {
  result: LotteryResult;
  isLatest?: boolean;
  defaultExpanded?: boolean;
};

function PrizeRow({
  tier,
  numbers,
  brandColor,
}: {
  tier: PrizeTier;
  numbers: string[];
  brandColor: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-bg-muted p-3 sm:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-2">
        <p className="text-caption font-semibold text-text-secondary">
          {t(`prize.${tier.key}`)}
        </p>
        <p className="text-[10px] text-text-tertiary">
          <span style={{ color: brandColor }} className="font-bold">
            {formatKip(tier.amountKip, { short: true })}
          </span>{' '}
          · {t('prize.count_label', { n: tier.count })}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {numbers.length > 0 ? (
          numbers.map((n, i) => (
            <span
              key={i}
              className="font-mono tabular-nums text-body-md font-bold text-text-primary bg-bg-elevated px-2 py-1 rounded-md border border-border-subtle"
            >
              {n}
            </span>
          ))
        ) : (
          <span className="text-caption text-text-tertiary">
            ({tier.count} {t('prize.count_label', { n: tier.count }).split(' ')[1] || ''})
          </span>
        )}
      </div>
    </div>
  );
}

export function LotteryResultCard({ result, isLatest, defaultExpanded }: Props) {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);
  const type = getLotteryType(result.drawType);
  if (!type) return null;
  const name = i18n.language === 'lo' ? type.nameLo : type.nameTh;

  const tiers = type.prizeStructure;
  const findTier = (key: string) => tiers.find((p) => p.key === key)!;

  const prize1Tier = findTier('prize1');

  return (
    <article
      className={cn(
        'rounded-2xl bg-bg-elevated border shadow-card overflow-hidden transition flex flex-col',
        isLatest ? 'border-brand-red shadow-result' : 'border-border-subtle hover:shadow-hover',
      )}
    >
      <header
        className="px-4 py-3 flex items-center justify-between gap-3"
        style={{ backgroundColor: `${type.brandColor}15` }}
      >
        <div className="min-w-0">
          <p
            className="text-overline truncate"
            style={{ color: type.brandColor }}
          >
            {name}
          </p>
          <p className="text-caption text-text-secondary">
            {t('result.draw_date')} {formatDateLao(result.drawDate)}
          </p>
        </div>
        {isLatest && (
          <span className="px-2 py-1 rounded-full bg-brand-red text-text-inverse text-[10px] font-bold uppercase shrink-0">
            {t('result.latest')}
          </span>
        )}
      </header>

      <div className="p-5 space-y-4">
        {/* Prize 1 hero */}
        <div className="text-center">
          <p className="text-overline text-text-tertiary mb-1">
            {t('prize.prize1')}
          </p>
          <p
            className="font-mono tabular-nums tracking-wider text-result-lg"
            style={{ color: type.brandColor }}
          >
            {result.prize1}
          </p>
          <p className="text-caption text-text-secondary">
            <i className="bi bi-coin me-1" style={{ color: type.brandColor }} />
            <span className="font-bold" style={{ color: type.brandColor }}>
              {formatKip(prize1Tier.amountKip, { short: true })}
            </span>
          </p>
        </div>

        {/* Top3 + Bottom2 + Front3 — featured */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-xl bg-bg-muted">
            <p className="text-overline text-text-tertiary mb-1">{t('prize.front3')}</p>
            <div className="flex justify-center gap-1 flex-wrap">
              {result.front3.map((n, i) => (
                <p key={i} className="font-mono text-result-sm text-text-primary tabular-nums">
                  {n}
                </p>
              ))}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-bg-muted">
            <p className="text-overline text-text-tertiary mb-1">{t('prize.top3')}</p>
            <div className="flex justify-center gap-1 flex-wrap">
              {result.top3.map((n, i) => (
                <p key={i} className="font-mono text-result-sm text-text-primary tabular-nums">
                  {n}
                </p>
              ))}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-bg-muted">
            <p className="text-overline text-text-tertiary mb-1">{t('prize.bottom2')}</p>
            <p className="font-mono text-result-sm text-text-primary tabular-nums">
              {result.bottom2}
            </p>
          </div>
        </div>

        {/* Side prize */}
        <PrizeRow
          tier={findTier('side1')}
          numbers={result.side1}
          brandColor={type.brandColor}
        />

        {/* Toggle full prize structure */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-caption text-brand-red font-semibold py-2 rounded-lg hover:bg-brand-red-soft transition flex items-center justify-center gap-1"
        >
          <i className={cn('bi', expanded ? 'bi-chevron-up' : 'bi-chevron-down')} />
          {expanded ? t('result.hide_prizes') : t('result.show_all_prizes')}
        </button>

        {expanded && (
          <div className="space-y-2 animate-fade-in-up">
            <PrizeRow
              tier={findTier('prize2')}
              numbers={result.prize2}
              brandColor={type.brandColor}
            />
            <PrizeRow
              tier={findTier('prize3')}
              numbers={result.prize3}
              brandColor={type.brandColor}
            />
            <PrizeRow tier={findTier('prize4')} numbers={[]} brandColor={type.brandColor} />
            <PrizeRow tier={findTier('prize5')} numbers={[]} brandColor={type.brandColor} />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-caption text-text-tertiary border-t border-border-subtle pt-3">
          <span className="inline-flex items-center gap-1 min-w-0">
            <i className="bi bi-shield-check text-success shrink-0" />
            <span className="truncate">
              {t('result.verified')} · {result.source}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
