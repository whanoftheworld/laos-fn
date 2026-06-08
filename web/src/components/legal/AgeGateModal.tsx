import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'lf:age-gate';

export function AgeGateModal() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  function confirm() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: 'confirmed', at: Date.now() }));
    setShow(false);
  }

  function decline() {
    window.location.href = 'https://www.google.com';
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bg-overlay p-4">
      <div className="w-full max-w-md rounded-2xl bg-bg-elevated border border-border-default shadow-hover p-6 text-center">
        <span className="inline-grid h-14 w-14 place-items-center rounded-full bg-brand-red-soft text-brand-red mb-3">
          <i className="bi bi-person-vcard text-2xl" />
        </span>
        <h2 className="text-h2 text-text-primary mb-2">{t('age_gate.title')}</h2>
        <p className="text-body-md text-text-secondary mb-5">{t('age_gate.body')}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={confirm}
            className="w-full px-4 py-3 rounded-lg bg-brand-red text-text-inverse font-bold hover:bg-brand-red-hover transition"
          >
            {t('age_gate.confirm')}
          </button>
          <button
            onClick={decline}
            className="w-full px-4 py-3 rounded-lg bg-bg-muted text-text-secondary font-semibold hover:bg-border-subtle transition"
          >
            {t('age_gate.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
