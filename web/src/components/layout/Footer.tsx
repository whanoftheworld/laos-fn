import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const socials = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'youtube', label: 'YouTube', href: '#' },
  { icon: 'line', label: 'Line OA', href: '#' },
  { icon: 'telegram', label: 'Telegram', href: '#' },
  { icon: 'tiktok', label: 'TikTok', href: '#' },
];

export function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-elevated border-t border-border-subtle mt-12 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-red text-text-inverse shadow-sm">
              <i className="bi bi-broadcast-pin text-xl" />
            </span>
            <div>
              <div className="text-h2 font-bold text-text-primary">ຫວຍລາວການເງິນ</div>
              <div className="text-caption text-text-tertiary">{t('site.tagline')}</div>
            </div>
          </div>
          <p className="text-body-md text-text-secondary max-w-lg">
            {t('footer.disclaimer_text')}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold-soft text-brand-gold text-caption font-semibold">
            <i className="bi bi-shield-check" />
            <span>{t('footer.concession_label')} 0XX/MOF/2026</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger-soft text-danger text-caption font-semibold ml-2">
            <i className="bi bi-person-x" />
            <span>{t('footer.age_restriction')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-h3 text-text-primary">{t('footer.legal')}</h3>
          <ul className="space-y-2 text-body-md text-text-secondary">
            <li>
              <Link to="/legal/privacy" className="hover:text-brand-red">
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="hover:text-brand-red">
                {t('footer.terms')}
              </Link>
            </li>
            <li>
              <Link to="/legal/cookies" className="hover:text-brand-red">
                {t('footer.cookies')}
              </Link>
            </li>
            <li>
              <Link to="/legal/disclaimer" className="hover:text-brand-red">
                {t('footer.disclaimer')}
              </Link>
            </li>
            <li>
              <Link to="/legal/responsible-play" className="hover:text-brand-red">
                {t('footer.responsible_play')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand-red">
                {t('footer.about')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-h3 text-text-primary">{t('footer.social_follow')}</h3>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg bg-bg-muted text-text-secondary hover:bg-brand-red-soft hover:text-brand-red transition"
              >
                <i className={`bi bi-${s.icon}`} />
              </a>
            ))}
          </div>
          <p className="text-caption text-text-tertiary">
            {t('footer.license_held_by')}: LAOS-Finance Co., Ltd. — Vientiane, Lao PDR
          </p>
        </div>
      </div>

      <div className="border-t border-border-subtle py-4 text-center text-caption text-text-tertiary">
        {t('footer.copyright', { year })}
        {' · '}
        <span lang={i18n.language}>{i18n.language === 'lo' ? 'ນະຄອນຫຼວງວຽງຈັນ ສປປ ລາວ' : 'นครหลวงเวียงจันทน์ สปป.ลาว'}</span>
      </div>
    </footer>
  );
}
