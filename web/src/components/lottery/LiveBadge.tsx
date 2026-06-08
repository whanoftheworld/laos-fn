import { useTranslation } from 'react-i18next';

type Props = { isLive: boolean; viewerCount?: number };

export function LiveBadge({ isLive, viewerCount }: Props) {
  const { t } = useTranslation();
  if (!isLive) return null;
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-live text-text-inverse text-caption font-bold uppercase animate-pulse-live shadow-live">
      <span className="h-2 w-2 rounded-full bg-white" />
      {t('live.badge')}
      {viewerCount != null && (
        <span className="ml-1 text-[10px] opacity-90 normal-case">
          <i className="bi bi-eye-fill" /> {viewerCount.toLocaleString()} {t('live.viewers')}
        </span>
      )}
    </span>
  );
}
