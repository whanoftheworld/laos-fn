import dayjs from 'dayjs';
import 'dayjs/locale/lo';
import 'dayjs/locale/th';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const TZ = 'Asia/Vientiane';

const LAO_MONTHS = [
  'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ',
  'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ',
];

const LAO_WEEKDAYS = ['ອາທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'];

export function formatDateLao(input: string | Date, opts?: { withWeekday?: boolean }) {
  const d = dayjs(input).tz(TZ);
  const day = d.date();
  const month = LAO_MONTHS[d.month()];
  const year = d.year();
  const base = `${day} ${month} ${year}`;
  return opts?.withWeekday ? `ວັນ${LAO_WEEKDAYS[d.day()]} ${base}` : base;
}

export function formatTimeLao(input: string | Date) {
  const d = dayjs(input).tz(TZ);
  return d.format('HH:mm');
}

export function formatDateTimeLao(input: string | Date) {
  return `${formatDateLao(input)} ເວລາ ${formatTimeLao(input)} ນ.`;
}

export function relativeTimeLao(input: string | Date) {
  return dayjs(input).locale('lo').fromNow();
}

export function thaiBuddhistDate(input: string | Date) {
  const d = dayjs(input).tz(TZ);
  return d.locale('th').format(`D MMMM ${d.year() + 543}`);
}

export function getNextDrawTime(hour = 20, minute = 30): Date {
  const now = dayjs().tz(TZ);
  let target = now.hour(hour).minute(minute).second(0).millisecond(0);
  if (!now.isBefore(target)) {
    target = target.add(1, 'day');
  }
  return target.toDate();
}

export function formatKip(amount: number, opts?: { short?: boolean }) {
  if (opts?.short) {
    if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(amount % 1_000_000_000 === 0 ? 0 : 1)} ຕື້ກີບ`;
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)} ລ້ານກີບ`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K ກີບ`;
    return `${amount} ກີບ`;
  }
  return `${amount.toLocaleString('en-US')} ກີບ`;
}

export function countdownTo(target: string | Date) {
  const diff = dayjs(target).tz(TZ).diff(dayjs().tz(TZ));
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    finished: false,
  };
}
