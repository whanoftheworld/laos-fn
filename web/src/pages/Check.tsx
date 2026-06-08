import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { lotteryTypes, recentResults } from '@/data/seed';
import { formatDateLao } from '@/lib/formatDate';

type Match = {
  prizeLabel: string;
  resultId: string;
  drawType: string;
  drawDate: string;
};

function matchAgainst(number: string): Match[] {
  const matches: Match[] = [];
  if (!number) return matches;
  for (const r of recentResults) {
    if (r.prize1 === number) {
      matches.push({ prizeLabel: 'รางวัลที่ 1', resultId: r.id, drawType: r.drawType, drawDate: r.drawDate });
    } else if (r.top3 === number.slice(-3)) {
      matches.push({ prizeLabel: 'เลขท้าย 3 ตัว', resultId: r.id, drawType: r.drawType, drawDate: r.drawDate });
    } else if (r.bottom2 === number.slice(-2)) {
      matches.push({ prizeLabel: 'เลขท้าย 2 ตัว', resultId: r.id, drawType: r.drawType, drawDate: r.drawDate });
    }
  }
  return matches;
}

export function Check() {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const initial = params.get('n') ?? '';
  const [number, setNumber] = useState(initial);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (initial) setChecked(true);
  }, [initial]);

  const matches = useMemo(() => (checked ? matchAgainst(number) : []), [checked, number]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setParams({ n: number });
    setChecked(true);
  }

  return (
    <>
      <Helmet>
        <title>{t('check.title')} — {t('site.name')}</title>
      </Helmet>

      <div className="max-w-2xl mx-auto space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-search text-brand-red" />
            {t('check.title')}
          </h1>
          <p className="text-body-md text-text-secondary">{t('check.subtitle')}</p>
        </header>

        <form
          onSubmit={submit}
          className="rounded-2xl bg-bg-elevated border border-border-subtle shadow-card p-5 sm:p-6 space-y-4"
        >
          <label className="block">
            <span className="text-caption text-text-secondary font-semibold">
              {t('check.input_label')}
            </span>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              pattern="[0-9]*"
              className="mt-2 w-full px-4 py-3 text-result-sm font-mono tabular-nums text-center rounded-xl border-2 border-border-default focus:border-brand-red bg-bg-muted focus:bg-bg-elevated outline-none transition"
              placeholder="000000"
            />
          </label>
          <button
            type="submit"
            disabled={number.length < 2}
            className="w-full px-6 py-3 rounded-xl bg-brand-red text-text-inverse font-bold hover:bg-brand-red-hover disabled:opacity-50 transition shadow-result"
          >
            {t('check.submit')}
          </button>
        </form>

        {checked && (
          <section>
            {matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((m, i) => {
                  const type = lotteryTypes.find((lt) => lt.slug === m.drawType);
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-success-soft border border-success/30"
                    >
                      <p className="text-h3 text-success flex items-center gap-2">
                        <i className="bi bi-trophy-fill" />
                        {i18n.language === 'lo' ? 'ຍິນດີດ້ວຍ!' : 'ยินดีด้วย!'}
                      </p>
                      <p className="text-body-md text-text-primary">
                        <strong className="text-success">{m.prizeLabel}</strong> ·{' '}
                        {type
                          ? i18n.language === 'lo'
                            ? type.nameLo
                            : type.nameTh
                          : m.drawType}{' '}
                        · {formatDateLao(m.drawDate)}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-bg-muted border border-border-subtle text-center">
                <i className="bi bi-emoji-frown text-3xl text-text-tertiary" />
                <p className="text-h3 text-text-primary mt-2">{t('check.result_no_match')}</p>
                <p className="text-caption text-text-tertiary mt-1">
                  {t('check.disclaimer', { source: 'ແຫຼ່ງທາງການ' })}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
