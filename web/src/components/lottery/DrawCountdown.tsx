import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { countdownTo, formatDateTimeLao } from '@/lib/formatDate';

type Props = { targetDate: string | Date; label?: string };

export function DrawCountdown({ targetDate, label }: Props) {
  const { t } = useTranslation();
  const [time, setTime] = useState(() => countdownTo(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(countdownTo(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { v: time.days, l: t('countdown.days') },
    { v: time.hours, l: t('countdown.hours') },
    { v: time.minutes, l: t('countdown.minutes') },
    { v: time.seconds, l: t('countdown.seconds') },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-hover text-text-inverse p-5 shadow-result">
      <p className="text-overline opacity-90 mb-3">{label || t('countdown.next_draw')}</p>
      <div className="grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.l} className="text-center">
            <p className="font-mono text-result-md tabular-nums">
              {String(u.v).padStart(2, '0')}
            </p>
            <p className="text-caption opacity-80">{u.l}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-caption opacity-80 text-center">
        <i className="bi bi-clock me-1" /> {formatDateTimeLao(targetDate)}
      </p>
    </div>
  );
}
