import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="text-center py-20">
      <p className="text-display-xl text-brand-red font-bold">404</p>
      <p className="text-h2 text-text-primary mt-2">
        {t('common.error')}
      </p>
      <Link
        to="/"
        className="inline-block mt-6 px-6 py-3 rounded-lg bg-brand-red text-text-inverse font-bold hover:bg-brand-red-hover transition"
      >
        <i className="bi bi-house-fill me-2" />
        {t('nav.home')}
      </Link>
    </div>
  );
}
