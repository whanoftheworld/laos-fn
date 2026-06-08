import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'lf:cookie-consent';

export function CookieBanner() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
  }, []);

  function decide(value: 'all' | 'none') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: Date.now() }));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:bottom-4 lg:inset-x-auto lg:right-4 lg:max-w-md">
      <div className="m-4 lg:m-0 rounded-2xl bg-bg-elevated border border-border-default shadow-hover p-4 sm:p-5">
        <h3 className="text-h3 text-text-primary mb-1 flex items-center gap-2">
          <i className="bi bi-shield-lock-fill text-brand-blue" />
          {t('cookie.title')}
        </h3>
        <p className="text-body-md text-text-secondary mb-3">{t('cookie.body')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => decide('all')}
            className="flex-1 px-4 py-2 rounded-lg bg-brand-red text-text-inverse font-semibold hover:bg-brand-red-hover transition"
          >
            {t('cookie.accept_all')}
          </button>
          <button
            onClick={() => decide('none')}
            className="flex-1 px-4 py-2 rounded-lg bg-bg-muted text-text-secondary font-semibold hover:bg-border-subtle transition"
          >
            {t('cookie.reject_all')}
          </button>
        </div>
      </div>
    </div>
  );
}
