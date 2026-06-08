import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const services = [
  { icon: 'clock-history', key: 'service.history', to: '/results' },
  { icon: 'search', key: 'service.check', to: '/check' },
  { icon: 'bar-chart-fill', key: 'service.stats', to: '/stats' },
  { icon: 'calendar3', key: 'service.schedule', to: '/schedule' },
  { icon: 'newspaper', key: 'service.news', to: '/news' },
  { icon: 'bell-fill', key: 'service.line_alert', to: '/subscribe' },
  { icon: 'question-circle', key: 'service.faq', to: '/faq' },
  { icon: 'life-preserver', key: 'service.help', to: '/contact' },
];

export function ServiceGrid() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="text-h2 text-text-primary mb-4 flex items-center gap-2">
        <i className="bi bi-grid-3x3-gap-fill text-brand-red" />
        {t('service.title')}
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
        {services.map((s) => (
          <Link
            key={s.key}
            to={s.to}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-brand-red hover:shadow-hover transition"
          >
            <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-xl bg-brand-red-soft text-brand-red group-hover:bg-brand-red group-hover:text-text-inverse transition">
              <i className={`bi bi-${s.icon} text-xl sm:text-2xl`} />
            </span>
            <span className="text-caption text-text-secondary text-center leading-tight">
              {t(s.key)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
