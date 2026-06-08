import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t, i18n } = useTranslation();
  const isLo = i18n.language === 'lo';

  return (
    <>
      <Helmet>
        <title>{t('nav.about')} — {t('site.name')}</title>
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <h1 className="text-h1 text-text-primary flex items-center gap-2">
            <i className="bi bi-shield-check text-brand-red" />
            {t('nav.about')}
          </h1>
        </header>

        <section className="rounded-2xl bg-bg-elevated border border-border-subtle shadow-card p-6 space-y-3">
          <h2 className="text-h2 text-text-primary">
            {isLo ? 'ກ່ຽວກັບ LAOS-Finance' : 'เกี่ยวกับ LAOS-Finance'}
          </h2>
          <p className="text-body-lg text-text-secondary">
            {isLo
              ? 'LAOS-Finance ເປັນເວັບໄຊທ໌ທາງການ ສຳລັບເຜີຍແຜ່ຜົນຫວຍລາວ ແລະ ການຖ່າຍທອດສົດ ການອອກຜົນລາງວັນ ພາຍໃຕ້ສຳປະທານໃໝ່ ຈາກລັດຖະບານ ສປປ ລາວ.'
              : 'LAOS-Finance เป็นเว็บไซต์ทางการ สำหรับเผยแพร่ผลหวยลาวและการถ่ายทอดสดการออกผลรางวัล ภายใต้สัมปทานใหม่จากรัฐบาล สปป.ลาว.'}
          </p>
          <p className="text-body-lg text-text-secondary">
            {isLo
              ? 'ພວກເຮົາມຸ່ງໝັ້ນທີ່ຈະໃຫ້ຂໍ້ມູນທີ່ຖືກຕ້ອງ ໂປ່ງໃສ ແລະ ສາມາດກວດສອບໄດ້ ໂດຍບໍ່ມີການຈຳໜ່າຍສະຫຼາກ ບໍ່ມີຕົວແທນ ບໍ່ມີການແຊັດສ່ວນຕົວ.'
              : 'เรามุ่งมั่นที่จะให้ข้อมูลที่ถูกต้อง โปร่งใส และสามารถตรวจสอบได้ โดยไม่มีการจำหน่ายสลาก ไม่มีตัวแทน ไม่มีการแชทส่วนตัว.'}
          </p>
        </section>

        <section className="rounded-2xl bg-brand-gold-soft border border-brand-gold/30 p-6 space-y-2">
          <h2 className="text-h2 text-brand-gold flex items-center gap-2">
            <i className="bi bi-patch-check-fill" />
            {isLo ? 'ຂໍ້ມູນສຳປະທານ' : 'ข้อมูลสัมปทาน'}
          </h2>
          <ul className="text-body-md text-text-primary space-y-1">
            <li>
              <strong>{t('footer.concession_label')}:</strong> 0XX/MOF/2026
            </li>
            <li>
              <strong>{isLo ? 'ວັນທີອອກໃບອະນຸຍາດ:' : 'วันที่ออกใบอนุญาต:'}</strong> 01/01/2026
            </li>
            <li>
              <strong>{isLo ? 'ໝົດອາຍຸ:' : 'หมดอายุ:'}</strong> 31/12/2030
            </li>
            <li>
              <strong>{isLo ? 'ຜູ້ອອກໃບອະນຸຍາດ:' : 'ผู้ออกใบอนุญาต:'}</strong>{' '}
              {isLo ? 'ກະຊວງການເງິນ ສປປ ລາວ' : 'กระทรวงการเงิน สปป.ลาว'}
            </li>
            <li>
              <strong>{t('footer.license_held_by')}:</strong> LAOS-Finance Co., Ltd.
            </li>
          </ul>
          <p className="text-caption text-text-tertiary mt-2">
            {isLo
              ? 'ໝາຍເຫດ: ໝາຍເລກສຳປະທານໃນຕົວຢ່າງ ໃຫ້ປ່ຽນເປັນຂໍ້ມູນຈິງເມື່ອໄດ້ຮັບເອກະສານທາງການ.'
              : 'หมายเหตุ: หมายเลขสัมปทานในตัวอย่าง ให้เปลี่ยนเป็นข้อมูลจริงเมื่อได้รับเอกสารทางการ.'}
          </p>
        </section>

        <section className="rounded-2xl bg-bg-elevated border border-border-subtle shadow-card p-6 space-y-3">
          <h2 className="text-h2 text-text-primary">{isLo ? 'ຕິດຕໍ່ສຳນັກງານ' : 'ติดต่อสำนักงาน'}</h2>
          <p className="text-body-md text-text-secondary">
            <i className="bi bi-geo-alt-fill text-brand-red me-1" />
            {isLo ? 'ນະຄອນຫຼວງວຽງຈັນ ສປປ ລາວ' : 'นครหลวงเวียงจันทน์ สปป.ลาว'}
          </p>
          <p className="text-body-md text-text-secondary">
            <i className="bi bi-envelope-fill text-brand-red me-1" />
            contact@laos-finance.la
          </p>
          <p className="text-body-md text-text-secondary">
            <i className="bi bi-telephone-fill text-brand-red me-1" />
            +856 21 XXX XXX
          </p>
        </section>
      </div>
    </>
  );
}
