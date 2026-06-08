import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function QuickCheckBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);

  function update(i: number, val: string) {
    const cleaned = val.replace(/\D/g, '').slice(0, 1);
    setDigits((d) => d.map((v, idx) => (idx === i ? cleaned : v)));
    if (cleaned && i < 5) {
      const next = document.getElementById(`qc-${i + 1}`);
      next?.focus();
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const num = digits.join('');
    navigate(`/check?n=${num}`);
  }

  return (
    <div className="rounded-2xl bg-bg-elevated border border-border-subtle shadow-card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-h2 text-text-primary flex items-center gap-2">
            <i className="bi bi-search text-brand-red" /> {t('check.title')}
          </h3>
          <p className="text-body-md text-text-secondary">{t('check.subtitle')}</p>
        </div>
      </div>
      <form className="flex flex-col sm:flex-row items-stretch gap-3" onSubmit={submit}>
        <div className="flex justify-center gap-2 sm:gap-2.5">
          {digits.map((v, i) => (
            <input
              key={i}
              id={`qc-${i}`}
              value={v}
              onChange={(e) => update(i, e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className="h-12 w-10 sm:h-14 sm:w-12 text-center text-h2 font-mono tabular-nums rounded-lg border-2 border-border-default bg-bg-muted focus:bg-bg-elevated focus:border-brand-red outline-none transition"
            />
          ))}
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-brand-red text-text-inverse font-bold hover:bg-brand-red-hover transition shadow-result"
        >
          <i className="bi bi-search me-2" />
          {t('check.submit')}
        </button>
      </form>
    </div>
  );
}
