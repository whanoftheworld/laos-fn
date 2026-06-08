import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { lotteryTypes } from '@/data/seed';

const dayNamesLo = ['ອາທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'];
const dayNamesTh = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

export function Schedule() {
  const { t, i18n } = useTranslation();
  const days = i18n.language === 'lo' ? dayNamesLo : dayNamesTh;

  return (
    <>
      <Helmet>
        <title>{t('nav.schedule')} — {t('site.name')}</title>
      </Helmet>

      <div className="space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-calendar3 text-brand-red" />
            {t('nav.schedule')}
          </h1>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-body-md">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-3 text-text-secondary font-semibold">{t('common.viewer_count')}</th>
                {days.map((d) => (
                  <th key={d} className="text-center py-3 px-3 text-text-secondary font-semibold">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lotteryTypes.map((type) => (
                <tr key={type.slug} className="border-b border-border-subtle hover:bg-bg-muted">
                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center gap-2 font-semibold"
                      style={{ color: type.brandColor }}
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: type.brandColor }}
                      />
                      {i18n.language === 'lo' ? type.nameLo : type.nameTh}
                    </span>
                    <div className="text-caption text-text-tertiary">{type.drawTimeLocal}</div>
                  </td>
                  {[0, 1, 2, 3, 4, 5, 6].map((dIdx) => (
                    <td key={dIdx} className="text-center py-3 px-3">
                      {type.drawDays.includes(dIdx) ? (
                        <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-brand-red-soft text-brand-red">
                          <i className="bi bi-check-lg" />
                        </span>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
