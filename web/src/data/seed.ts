import { getNextDrawTime } from '@/lib/formatDate';
import type {
  ChatMessage,
  LotteryResult,
  LotteryType,
  NewsArticle,
  NumberStat,
  PrizeTier,
  StreamSchedule,
} from '@/types';

const standardPrizeStructure: PrizeTier[] = [
  { key: 'prize1', amountKip: 6_000_000_000, count: 1, digits: 6 },
  { key: 'prize2', amountKip: 200_000_000, count: 5, digits: 6 },
  { key: 'prize3', amountKip: 80_000_000, count: 10, digits: 6 },
  { key: 'prize4', amountKip: 40_000_000, count: 50, digits: 6 },
  { key: 'prize5', amountKip: 20_000_000, count: 100, digits: 6 },
  { key: 'side1', amountKip: 100_000_000, count: 2, digits: 6 },
  { key: 'front3', amountKip: 4_000_000, count: 2, digits: 3 },
  { key: 'top3', amountKip: 4_000_000, count: 2, digits: 3 },
  { key: 'bottom2', amountKip: 2_000_000, count: 1, digits: 2 },
];

export const lotteryTypes: LotteryType[] = [
  {
    slug: 'lao-finance',
    nameLo: 'ຫວຍລາວການເງິນ',
    nameTh: 'หวยลาวการเงิน',
    nameEn: 'Lao Finance Lottery',
    drawDays: [1, 2, 3, 4, 5],
    drawTimeLocal: '20:30',
    digitCount: 6,
    brandColor: '#C8102E',
    description: {
      lo: 'ຫວຍລາວການເງິນ ເປັນຫວຍຫຼັກພາຍໃຕ້ສຳປະທານໃໝ່ ອອກສຳເລັດ 5 ມື້ຕໍ່ອາທິດ (ຈັນ–ສຸກ) ເວລາ 20:30 ນ. ຖ່າຍທອດສົດທາງ LAOS-Finance.',
      th: 'หวยลาวการเงิน เป็นหวยหลักภายใต้สัมปทานใหม่ ออกผล 5 วันต่อสัปดาห์ (จันทร์–ศุกร์) เวลา 20:30 น. ถ่ายทอดสดทาง LAOS-Finance.',
    },
    prizeStructure: standardPrizeStructure,
  },
  {
    slug: 'lao-vientiane',
    nameLo: 'ຫວຍລາວວຽງຈັນ',
    nameTh: 'หวยลาวเวียงจันทน์',
    nameEn: 'Lao Vientiane Lottery',
    drawDays: [0, 1, 2, 3, 4, 5, 6],
    drawTimeLocal: '14:30',
    digitCount: 6,
    brandColor: '#003DA5',
    description: {
      lo: 'ຫວຍລາວວຽງຈັນ ອອກສຳເລັດທຸກວັນ ໃນຊ່ວງບ່າຍ ເວລາ 14:30 ນ. ໂດຍຄະນະຄຸ້ມຄອງ ນະຄອນຫຼວງວຽງຈັນ.',
      th: 'หวยลาวเวียงจันทน์ ออกผลทุกวันช่วงบ่ายเวลา 14:30 น. โดยคณะกรรมการนครหลวงเวียงจันทน์.',
    },
    prizeStructure: standardPrizeStructure,
  },
  {
    slug: 'lao-pakse',
    nameLo: 'ຫວຍລາວປາກເຊ',
    nameTh: 'หวยลาวปากเซ',
    nameEn: 'Lao Pakse Lottery',
    drawDays: [0, 1, 2, 3, 4, 5, 6],
    drawTimeLocal: '10:30',
    digitCount: 6,
    brandColor: '#0E7C3A',
    description: {
      lo: 'ຫວຍລາວປາກເຊ ອອກສຳເລັດທຸກວັນ ໃນຊ່ວງເຊົ້າ ເວລາ 10:30 ນ. ໂດຍຄະນະຄຸ້ມຄອງ ແຂວງຈຳປາສັກ.',
      th: 'หวยลาวปากเซ ออกผลทุกวันช่วงเช้าเวลา 10:30 น. โดยคณะกรรมการแขวงจำปาสัก.',
    },
    prizeStructure: standardPrizeStructure,
  },
];

const today = new Date();
const ymd = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return ymd(d);
};
const daysFromNow = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

function makeResult(opts: {
  id: string;
  drawType: LotteryResult['drawType'];
  drawDate: string;
  prize1: string;
  source: string;
  publishedAt?: string;
}): LotteryResult {
  const p1 = opts.prize1;
  return {
    id: opts.id,
    drawType: opts.drawType,
    drawDate: opts.drawDate,
    prize1: p1,
    prize2: ['384912', '209873', '671402', '518340', '927065'],
    prize3: ['104928', '736210', '492835', '850172', '673094', '218046', '590387', '417629', '835104', '276483'],
    prize4Count: 50,
    prize5Count: 100,
    side1: [
      String(Number(p1) - 1).padStart(6, '0'),
      String(Number(p1) + 1).padStart(6, '0'),
    ],
    front3: ['382', '917'],
    top3: [p1.slice(-3), '254'],
    bottom2: p1.slice(-2),
    status: 'published',
    source: opts.source,
    publishedAt: opts.publishedAt ?? new Date().toISOString(),
    verifiedBy: 'admin-01',
  };
}

export const recentResults: LotteryResult[] = [
  makeResult({
    id: 'r-001',
    drawType: 'lao-finance',
    drawDate: daysAgo(1),
    prize1: '482701',
    source: 'LAOS-Finance Official',
    publishedAt: new Date(Date.now() - 86_400e3).toISOString(),
  }),
  makeResult({
    id: 'r-002',
    drawType: 'lao-vientiane',
    drawDate: daysAgo(0),
    prize1: '305928',
    source: 'ຄະນະຄຸ້ມຄອງ ນະຄອນຫຼວງວຽງຈັນ',
  }),
  makeResult({
    id: 'r-003',
    drawType: 'lao-pakse',
    drawDate: daysAgo(0),
    prize1: '671284',
    source: 'ຄະນະຄຸ້ມຄອງ ແຂວງຈຳປາສັກ',
  }),
  makeResult({
    id: 'r-004',
    drawType: 'lao-finance',
    drawDate: daysAgo(2),
    prize1: '156430',
    source: 'LAOS-Finance Official',
    publishedAt: new Date(Date.now() - 2 * 86_400e3).toISOString(),
  }),
  makeResult({
    id: 'r-005',
    drawType: 'lao-vientiane',
    drawDate: daysAgo(1),
    prize1: '892017',
    source: 'ຄະນະຄຸ້ມຄອງ ນະຄອນຫຼວງວຽງຈັນ',
    publishedAt: new Date(Date.now() - 86_400e3).toISOString(),
  }),
  makeResult({
    id: 'r-006',
    drawType: 'lao-pakse',
    drawDate: daysAgo(1),
    prize1: '740583',
    source: 'ຄະນະຄຸ້ມຄອງ ແຂວງຈຳປາສັກ',
    publishedAt: new Date(Date.now() - 86_400e3).toISOString(),
  }),
];

export const upcomingStreams: StreamSchedule[] = [
  {
    id: 's-001',
    drawType: 'lao-finance',
    scheduledAt: getNextDrawTime(20, 30).toISOString(),
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    status: 'live',
    viewerCount: 3421,
    title: {
      lo: 'ຖ່າຍທອດສົດ ປະກາດຜົນຫວຍລາວການເງິນ ງວດປະຈຳມື້',
      th: 'ถ่ายทอดสด ประกาศผลหวยลาวการเงิน งวดประจำวัน',
    },
  },
  {
    id: 's-002',
    drawType: 'lao-vientiane',
    scheduledAt: getNextDrawTime(14, 30).toISOString(),
    streamUrl: '',
    status: 'scheduled',
    title: {
      lo: 'ຖ່າຍທອດສົດ ປະກາດຜົນຫວຍລາວວຽງຈັນ',
      th: 'ถ่ายทอดสด ประกาศผลหวยลาวเวียงจันทน์',
    },
  },
  {
    id: 's-003',
    drawType: 'lao-pakse',
    scheduledAt: getNextDrawTime(10, 30).toISOString(),
    streamUrl: '',
    status: 'scheduled',
    title: {
      lo: 'ຖ່າຍທອດສົດ ປະກາດຜົນຫວຍລາວປາກເຊ',
      th: 'ถ่ายทอดสด ประกาศผลหวยลาวปากเซ',
    },
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'n-001',
    slug: 'lao-finance-launch-2026',
    category: 'announcements',
    thumbnail: 'https://picsum.photos/seed/laosfinance-launch-2026/1200/675',
    title: {
      lo: 'ເປີດໂຕ ຫວຍລາວການເງິນ ຢ່າງເປັນທາງການ ພາຍໃຕ້ສຳປະທານໃໝ່ຈາກລັດຖະບານ ສປປ ລາວ',
      th: 'เปิดตัว LAOS-Finance อย่างเป็นทางการ ภายใต้สัมปทานใหม่จากรัฐบาล สปป.ลาว',
    },
    excerpt: {
      lo: 'LAOS-Finance ໄດ້ຮັບສຳປະທານໃໝ່ ດຳເນີນການເຜີຍແຜ່ຜົນຫວຍລາວການເງິນ, ຫວຍລາວວຽງຈັນ ແລະ ຫວຍລາວປາກເຊ ພ້ອມການຖ່າຍທອດສົດແບບ real-time.',
      th: 'LAOS-Finance ได้รับสัมปทานใหม่ ดำเนินการเผยแพร่ผลหวยลาวการเงิน หวยลาวเวียงจันทน์ และหวยลาวปากเซ พร้อมการถ่ายทอดสดแบบเรียลไทม์.',
    },
    body: {
      lo: 'ກະຊວງການເງິນ ສປປ ລາວ ໄດ້ມອບສຳປະທານໃໝ່ໃຫ້ LAOS-Finance ດຳເນີນການເຜີຍແຜ່ຂໍ້ມູນ ແລະ ຖ່າຍທອດສົດການອອກລາງວັນຫວຍ 3 ປະເພດ ຄື ຫວຍລາວການເງິນ, ຫວຍລາວວຽງຈັນ ແລະ ຫວຍລາວປາກເຊ.\n\nຂໍ້ມູນຜົນລາງວັນຈະຖືກປ້ອນເຂົ້າຫາລະບົບໂດຍທີມແອັດມິນແບບ real-time ໃນຂະນະທີ່ການຖ່າຍທອດສົດກຳລັງດຳເນີນຢູ່ ເພື່ອໃຫ້ປະຊາຊົນທີ່ເບິ່ງຢູ່ໄດ້ກວດສອບເລກພ້ອມກັນ ບໍ່ມີຄວາມລ່າຊ້າ.\n\nເວັບໄຊທ໌ນີ້ບໍ່ມີການຈຳໜ່າຍສະຫຼາກ ບໍ່ມີຕົວແທນ ບໍ່ມີການແຊັດສ່ວນຕົວ ຫາກພົບເຫັນຜູ້ແອບອ້າງ ກະລຸນາແຈ້ງສູນຊ່ວຍເຫຼືອ.',
      th: 'กระทรวงการเงิน สปป.ลาว ได้มอบสัมปทานใหม่ให้ LAOS-Finance ดำเนินการเผยแพร่ข้อมูลและถ่ายทอดสดการออกรางวัลหวย 3 ประเภท คือ หวยลาวการเงิน หวยลาวเวียงจันทน์ และหวยลาวปากเซ.\n\nข้อมูลผลรางวัลจะถูกป้อนเข้าระบบโดยทีมแอดมินแบบเรียลไทม์ในขณะที่การถ่ายทอดสดกำลังดำเนินอยู่ เพื่อให้ประชาชนที่ดูอยู่สามารถตรวจสอบเลขพร้อมกันได้โดยไม่มีความล่าช้า.\n\nเว็บไซต์นี้ไม่มีการจำหน่ายสลาก ไม่มีตัวแทน ไม่มีการแชทส่วนตัว หากพบเห็นผู้แอบอ้าง กรุณาแจ้งศูนย์ช่วยเหลือ.',
    },
    author: 'ທີມງານ LAOS-Finance',
    publishedAt: daysFromNow(-1),
    readMinutes: 3,
    tags: ['official', 'launch', 'concession'],
  },
  {
    id: 'n-002',
    slug: 'schedule-expansion-5-days',
    category: 'announcements',
    thumbnail: 'https://picsum.photos/seed/lao-finance-5days/1200/675',
    title: {
      lo: 'ປະກາດຂະຫຍາຍຕາຕະລາງອອກລາງວັນ ຫວຍລາວການເງິນ ເປັນ 5 ມື້ຕໍ່ອາທິດ',
      th: 'ประกาศขยายตารางออกรางวัล หวยลาวการเงิน เป็น 5 วันต่อสัปดาห์',
    },
    excerpt: {
      lo: 'ເລີ່ມຕັ້ງແຕ່ມື້ນີ້ ຫວຍລາວການເງິນ ຈະອອກສຳເລັດ 5 ມື້ຕໍ່ອາທິດ (ຈັນ-ສຸກ) ເວລາ 20:30 ນ. ຈາກເດີມ 3 ມື້.',
      th: 'เริ่มตั้งแต่วันนี้ หวยลาวการเงินจะออกผล 5 วันต่อสัปดาห์ (จันทร์-ศุกร์) เวลา 20:30 น. จากเดิม 3 วัน.',
    },
    body: {
      lo: 'ຕາມການປະກາດໃໝ່ ຫວຍລາວການເງິນ ໄດ້ປັບປ່ຽນຕາຕະລາງອອກລາງວັນ ຈາກ 3 ມື້ຕໍ່ອາທິດ (ຈັນ, ພະຫັດ, ສຸກ) ມາເປັນ 5 ມື້ຕໍ່ອາທິດ (ຈັນ-ສຸກ).\n\nເວລາການອອກລາງວັນ ຍັງຄົງເປັນເວລາ 20:30 ນ. ຖ່າຍທອດສົດທາງເວັບໄຊທ໌ ແລະ ຊ່ອງທາງສື່ສັງຄົມຂອງ LAOS-Finance.\n\nຮ່ວມກັບການປ່ຽນແປງນີ້ ຮູບແບບການອອກລາງວັນ ຈະຍັງຄົງເປັນແບບ 6 ໂຕ ໂດຍຮັກສາໂຄງສ້າງລາງວັນເຄື່ອນທ່າເຊັ່ນເດີມ.',
      th: 'ตามการประกาศใหม่ หวยลาวการเงิน ได้ปรับเปลี่ยนตารางออกรางวัลจาก 3 วันต่อสัปดาห์ (จันทร์, พฤหัสบดี, ศุกร์) มาเป็น 5 วันต่อสัปดาห์ (จันทร์-ศุกร์).\n\nเวลาการออกรางวัลยังคงเป็นเวลา 20:30 น. ถ่ายทอดสดทางเว็บไซต์และช่องทางสื่อสังคมของ LAOS-Finance.\n\nร่วมกับการเปลี่ยนแปลงนี้ รูปแบบการออกรางวัลจะยังคงเป็นแบบ 6 ตัว โดยรักษาโครงสร้างรางวัลเช่นเดิม.',
    },
    author: 'ກອງບັນນາທິການ',
    publishedAt: daysFromNow(-2),
    readMinutes: 4,
    tags: ['schedule', 'lao-finance'],
  },
  {
    id: 'n-003',
    slug: 'prize-structure-explained',
    category: 'regulatory',
    thumbnail: 'https://picsum.photos/seed/lao-prize-structure-2026/1200/675',
    title: {
      lo: 'ໂຄງສ້າງລາງວັນຫວຍລາວ ສະບັບໃໝ່ ປີ 2026 — ລາງວັນທີ 1 ສູງເຖິງ 6 ຕື້ກີບ',
      th: 'โครงสร้างรางวัลหวยลาว ฉบับใหม่ ปี 2026 — รางวัลที่ 1 สูงถึง 6 พันล้านกีบ',
    },
    excerpt: {
      lo: 'ປະກາດໂຄງສ້າງລາງວັນສະບັບໃໝ່ ປະກອບດ້ວຍ 5 ລາງວັນຫຼັກ + ລາງວັນຂ້າງຄຽງ + ເລກໜ້າ/ທ້າຍ ລວມຫຼາຍກວ່າ 170 ລາງວັນຕໍ່ງວດ.',
      th: 'ประกาศโครงสร้างรางวัลฉบับใหม่ ประกอบด้วย 5 รางวัลหลัก + รางวัลข้างเคียง + เลขหน้า/ท้าย รวมกว่า 170 รางวัลต่องวด.',
    },
    body: {
      lo: 'ໂຄງສ້າງລາງວັນຂອງຫວຍລາວທັງ 3 ປະເພດ ມີຄືກັນດັ່ງນີ້:\n\n- ລາງວັນທີ 1: 6,000,000,000 ກີບ (1 ລາງວັນ)\n- ລາງວັນທີ 2: 200,000,000 ກີບ × 5 ລາງວັນ\n- ລາງວັນທີ 3: 80,000,000 ກີບ × 10 ລາງວັນ\n- ລາງວັນທີ 4: 40,000,000 ກີບ × 50 ລາງວັນ\n- ລາງວັນທີ 5: 20,000,000 ກີບ × 100 ລາງວັນ\n- ລາງວັນຂ້າງຄຽງລາງວັນທີ 1: 100,000,000 ກີບ × 2 ລາງວັນ\n- ເລກໜ້າ 3 ໂຕ: 4,000,000 ກີບ × 2 ລາງວັນ\n- ເລກທ້າຍ 3 ໂຕ: 4,000,000 ກີບ × 2 ລາງວັນ\n- ເລກທ້າຍ 2 ໂຕ: 2,000,000 ກີບ × 1 ລາງວັນ\n\nລວມເງິນລາງວັນຕໍ່ງວດ ປະມານ 12 ຕື້ກີບ.',
      th: 'โครงสร้างรางวัลของหวยลาวทั้ง 3 ประเภทมีเหมือนกันดังนี้:\n\n- รางวัลที่ 1: 6,000,000,000 กีบ (1 รางวัล)\n- รางวัลที่ 2: 200,000,000 กีบ × 5 รางวัล\n- รางวัลที่ 3: 80,000,000 กีบ × 10 รางวัล\n- รางวัลที่ 4: 40,000,000 กีบ × 50 รางวัล\n- รางวัลที่ 5: 20,000,000 กีบ × 100 รางวัล\n- รางวัลข้างเคียงรางวัลที่ 1: 100,000,000 กีบ × 2 รางวัล\n- เลขหน้า 3 ตัว: 4,000,000 กีบ × 2 รางวัล\n- เลขท้าย 3 ตัว: 4,000,000 กีบ × 2 รางวัล\n- เลขท้าย 2 ตัว: 2,000,000 กีบ × 1 รางวัล\n\nรวมเงินรางวัลต่องวดประมาณ 12 พันล้านกีบ.',
    },
    author: 'ກອງບັນນາທິການ',
    publishedAt: daysFromNow(-3),
    readMinutes: 5,
    tags: ['prize-structure', 'regulation'],
  },
  {
    id: 'n-004',
    slug: 'vientiane-broadcast-upgrade',
    category: 'system_notices',
    thumbnail: 'https://picsum.photos/seed/lao-vientiane-hd-broadcast/1200/675',
    title: {
      lo: 'ຫວຍລາວວຽງຈັນ ຍົກລະດັບການຖ່າຍທອດສົດ ເປັນ HD ພ້ອມລະບົບແຊັດສົດ',
      th: 'หวยลาวเวียงจันทน์ ยกระดับการถ่ายทอดสดเป็น HD พร้อมระบบแชทสด',
    },
    excerpt: {
      lo: 'ປັບປຸງລະບົບ HLS ໃໝ່ ໃຫ້ມີຄຸນະພາບ 1080p ພ້ອມລະບົບແຊັດສົດທີ່ໃຫ້ຜູ້ຊົມພົວພັນກັນໄດ້ໃນຂະນະຖ່າຍທອດ.',
      th: 'ปรับปรุงระบบ HLS ใหม่ให้มีคุณภาพ 1080p พร้อมระบบแชทสดที่ให้ผู้ชมโต้ตอบกันได้ในขณะถ่ายทอด.',
    },
    body: {
      lo: 'ການຖ່າຍທອດສົດການອອກລາງວັນຫວຍລາວວຽງຈັນ ໄດ້ຮັບການຍົກລະດັບເປັນ HLS ຄຸນະພາບ 1080p (Full HD) ສະຖຽນ ບໍ່ກະຕຸກ ໃຊ້ bandwidth ໜ້ອຍກວ່າເດີມ ປະມານ 30%.\n\nລະບົບແຊັດສົດ ໃຫ້ຜູ້ຊົມສະແດງຄຳຄິດເຫັນ ແລະ ຮ່ວມໃຫ້ກຳລັງໃຈກັນ ໃນຂະນະຖ່າຍທອດ ໂດຍມີທີມແອັດມິນດູແລການນຳໃຊ້ ຫ້າມຂາຍເລກ ຫ້າມໂຄສະນາ.',
      th: 'การถ่ายทอดสดการออกรางวัลหวยลาวเวียงจันทน์ ได้รับการยกระดับเป็น HLS คุณภาพ 1080p (Full HD) เสถียร ไม่กระตุก ใช้ bandwidth น้อยกว่าเดิมประมาณ 30%.\n\nระบบแชทสด ให้ผู้ชมแสดงความคิดเห็นและให้กำลังใจกัน ในขณะถ่ายทอด โดยมีทีมแอดมินดูแลการใช้งาน ห้ามขายเลข ห้ามโฆษณา.',
    },
    author: 'ທີມວິສະວະກອນ',
    publishedAt: daysFromNow(-4),
    readMinutes: 3,
    tags: ['live', 'broadcast', 'lao-vientiane'],
  },
  {
    id: 'n-005',
    slug: 'pakse-morning-draw-launch',
    category: 'announcements',
    thumbnail: 'https://picsum.photos/seed/lao-pakse-morning-draw/1200/675',
    title: {
      lo: 'ຫວຍລາວປາກເຊ ເປີດໃຫ້ບໍລິການງວດເຊົ້າ ທຸກວັນ ເວລາ 10:30 ນ.',
      th: 'หวยลาวปากเซ เปิดให้บริการงวดเช้าทุกวัน เวลา 10:30 น.',
    },
    excerpt: {
      lo: 'ຫວຍລາວປາກເຊ ເພີ່ມງວດເຊົ້າ ໃຫ້ບໍລິການທຸກວັນ ໂດຍຄະນະຄຸ້ມຄອງ ແຂວງຈຳປາສັກ.',
      th: 'หวยลาวปากเซ เพิ่มงวดเช้าให้บริการทุกวัน โดยคณะกรรมการแขวงจำปาสัก.',
    },
    body: {
      lo: 'ເພື່ອຕອບສະໜອງຄວາມຕ້ອງການຂອງປະຊາຊົນ ຫວຍລາວປາກເຊ ໄດ້ປະກາດເພີ່ມງວດເຊົ້າ ໃຫ້ບໍລິການທຸກວັນ ເວລາ 10:30 ນ.\n\nການອອກລາງວັນ ໃຊ້ໂຄງສ້າງດຽວກັນກັບຫວຍລາວການເງິນ ແລະ ຫວຍລາວວຽງຈັນ ໂດຍຄະນະຄຸ້ມຄອງ ແຂວງຈຳປາສັກ ເປັນຜູ້ດຳເນີນການ.\n\nການຖ່າຍທອດສົດ ສາມາດເບິ່ງໄດ້ທາງເວັບໄຊທ໌ LAOS-Finance ແລະ ຊ່ອງທາງ YouTube ທາງການ.',
      th: 'เพื่อตอบสนองความต้องการของประชาชน หวยลาวปากเซ ได้ประกาศเพิ่มงวดเช้าให้บริการทุกวันเวลา 10:30 น.\n\nการออกรางวัลใช้โครงสร้างเดียวกันกับหวยลาวการเงินและหวยลาวเวียงจันทน์ โดยคณะกรรมการแขวงจำปาสักเป็นผู้ดำเนินการ.\n\nการถ่ายทอดสดสามารถดูได้ทางเว็บไซต์ LAOS-Finance และช่องทาง YouTube ทางการ.',
    },
    author: 'ກອງບັນນາທິການ',
    publishedAt: daysFromNow(-5),
    readMinutes: 4,
    tags: ['lao-pakse', 'launch'],
  },
  {
    id: 'n-006',
    slug: 'anti-fraud-warning-2026',
    category: 'anti_fraud',
    thumbnail: 'https://picsum.photos/seed/lao-anti-fraud-warning/1200/675',
    title: {
      lo: 'ເຕືອນໄພ! ມິດສະຫາຍແອບອ້າງເປັນຕົວແທນ LAOS-Finance ຂາຍເລກຜ່ານ Line ແລະ Facebook',
      th: 'เตือนภัย! มิจฉาชีพแอบอ้างเป็นตัวแทน LAOS-Finance ขายเลขผ่าน Line และ Facebook',
    },
    excerpt: {
      lo: 'ໃນຊ່ວງເດືອນທີ່ຜ່ານມາ ມີຜູ້ແອບອ້າງເປັນຕົວແທນຂາຍເລກ ກະລຸນາລະວັງ ແລະ ບໍ່ໂອນເງິນໃຫ້ບໍ່ວ່າກໍລະນີໃດ.',
      th: 'ในช่วงเดือนที่ผ่านมา มีผู้แอบอ้างเป็นตัวแทนขายเลข กรุณาระวังและไม่โอนเงินให้ไม่ว่ากรณีใด.',
    },
    body: {
      lo: 'LAOS-Finance ໄດ້ຮັບການແຈ້ງເຕືອນຈາກປະຊາຊົນ ກ່ຽວກັບກຸ່ມມິດສະຫາຍ ທີ່ແອບອ້າງເປັນເຈົ້າໜ້າທີ່ ຫຼື ຕົວແທນຂອງເຮົາ ເພື່ອຂາຍເລກ ຫຼື ຮັບເງິນຝາກ.\n\nຍ້ຳອີກຄັ້ງວ່າ:\n- LAOS-Finance ບໍ່ມີການຂາຍສະຫຼາກ\n- ບໍ່ມີຕົວແທນ ບໍ່ມີນາຍຫນ້າ\n- ບໍ່ມີການແຊັດສ່ວນຕົວ\n- ບໍ່ມີການຮັບເງິນຝາກ ບໍ່ມີການໃຫ້ກູ້\n\nຫາກພົບເຫັນຜູ້ສົງໄສ ກະລຸນາແຈ້ງເບີສາຍດ່ວນ 165 (ສປປ ລາວ) ຫຼື ສະຖານີຕຳຫຼວດໃກ້ບ້ານ.',
      th: 'LAOS-Finance ได้รับการแจ้งเตือนจากประชาชน เกี่ยวกับกลุ่มมิจฉาชีพที่แอบอ้างเป็นเจ้าหน้าที่หรือตัวแทนของเรา เพื่อขายเลขหรือรับเงินฝาก.\n\nย้ำอีกครั้งว่า:\n- LAOS-Finance ไม่มีการขายสลาก\n- ไม่มีตัวแทน ไม่มีนายหน้า\n- ไม่มีการแชทส่วนตัว\n- ไม่มีการรับเงินฝาก ไม่มีการให้กู้\n\nหากพบเห็นผู้ต้องสงสัย กรุณาแจ้งเบอร์สายด่วน 165 (สปป.ลาว) หรือสถานีตำรวจใกล้บ้าน.',
    },
    author: 'ຝ່າຍຄວາມປອດໄພ',
    publishedAt: daysFromNow(-6),
    readMinutes: 5,
    tags: ['security', 'warning', 'fraud'],
  },
  {
    id: 'n-007',
    slug: 'responsible-play-guide',
    category: 'responsible_play',
    thumbnail: 'https://picsum.photos/seed/lao-responsible-play/1200/675',
    title: {
      lo: 'ຫຼີ້ນຢ່າງມີຄວາມຮັບຜິດຊອບ — ຄຳແນະນຳ 5 ຂໍ້ ສຳລັບຜູ້ສຳພັນຮ່ວມງານກັບການເສ່ຍໂຊກ',
      th: 'เล่นอย่างรับผิดชอบ — คำแนะนำ 5 ข้อ สำหรับผู้ที่เกี่ยวข้องกับการเสี่ยงโชค',
    },
    excerpt: {
      lo: 'ການເສ່ຍໂຊກບໍ່ໃຊ່ວິທີຫາລາຍໄດ້ ກຳນົດງົບປະມານ ແລະ ປະຕິບັດຕາມຄຳແນະນຳ 5 ຂໍ້ນີ້ ເພື່ອຄວາມເຫມາະສົມ.',
      th: 'การเสี่ยงโชคไม่ใช่วิธีหารายได้ กำหนดงบประมาณและปฏิบัติตามคำแนะนำ 5 ข้อนี้เพื่อความเหมาะสม.',
    },
    body: {
      lo: 'ຄຳແນະນຳ 5 ຂໍ້ ສຳລັບການເສ່ຍໂຊກຢ່າງມີຄວາມຮັບຜິດຊອບ:\n\n1. ກຳນົດງົບປະມານທີ່ບໍ່ກະທົບການໃຊ້ຊີວິດປະຈຳວັນ\n2. ບໍ່ໃຊ້ເງິນກູ້ ຫຼື ເງິນຄອບຄົວ\n3. ບໍ່ໃຊ້ການເສ່ຍໂຊກໃນການແກ້ບັນຫາທາງການເງິນ\n4. ກຳນົດເວລາ ບໍ່ໃຫ້ກະທົບການເຮັດວຽກ\n5. ຫາກຮູ້ສຶກວ່າຄວບຄຸມບໍ່ໄດ້ ກະລຸນາຕິດຕໍ່ສາຍດ່ວນ\n\nສາຍດ່ວນຊ່ວຍເຫຼືອ:\n- ສປປ ລາວ: 165 (ສຸຂະພາບຈິດ)\n- ໄທ: 1323 (ສຸຂະພາບຈິດ)',
      th: 'คำแนะนำ 5 ข้อ สำหรับการเสี่ยงโชคอย่างรับผิดชอบ:\n\n1. กำหนดงบประมาณที่ไม่กระทบการใช้ชีวิตประจำวัน\n2. ไม่ใช้เงินกู้หรือเงินครอบครัว\n3. ไม่ใช้การเสี่ยงโชคในการแก้ปัญหาทางการเงิน\n4. กำหนดเวลา ไม่ให้กระทบการทำงาน\n5. หากรู้สึกควบคุมไม่ได้ กรุณาติดต่อสายด่วน\n\nสายด่วนช่วยเหลือ:\n- สปป.ลาว: 165 (สุขภาพจิต)\n- ไทย: 1323 (สุขภาพจิต)',
    },
    author: 'ຝ່າຍຄວາມຮັບຜິດຊອບ',
    publishedAt: daysFromNow(-7),
    readMinutes: 6,
    tags: ['responsible-play', 'help'],
  },
  {
    id: 'n-008',
    slug: 'weekly-recap',
    category: 'results_recap',
    thumbnail: 'https://picsum.photos/seed/lao-weekly-recap-stats/1200/675',
    title: {
      lo: 'ສະຫຼຸບຜົນຫວຍລາວທັງ 3 ປະເພດ ປະຈຳອາທິດ ພ້ອມສະຖິຕິເລກທີ່ມາແຮງ',
      th: 'สรุปผลหวยลาวทั้ง 3 ประเภทประจำสัปดาห์ พร้อมสถิติเลขที่มาแรง',
    },
    excerpt: {
      lo: 'ສະຫຼຸບເລກທີ່ອອກໃນແຕ່ລະງວດ ພ້ອມສະຖິຕິເລກທີ່ມາແຮງ ແລະ ເລກທີ່ບໍ່ມາໃນ 10 ງວດ.',
      th: 'สรุปเลขที่ออกในแต่ละงวด พร้อมสถิติเลขที่มาแรงและเลขที่ไม่ออกใน 10 งวด.',
    },
    body: {
      lo: 'ສະຫຼຸບຜົນຫວຍລາວປະຈຳອາທິດ:\n\n- ຫວຍລາວການເງິນ: ລາງວັນທີ 1 ງວດລ່າສຸດ 482701, ກ່ອນໜ້າ 156430\n- ຫວຍລາວວຽງຈັນ: ລາງວັນທີ 1 ງວດລ່າສຸດ 305928, ກ່ອນໜ້າ 892017\n- ຫວຍລາວປາກເຊ: ລາງວັນທີ 1 ງວດລ່າສຸດ 671284, ກ່ອນໜ້າ 740583\n\nສະຖິຕິເລກທີ່ມາແຮງໃນອາທິດນີ້: 19, 28, 67\nເລກທີ່ບໍ່ມາໃນ 10 ງວດ: 04, 90\n\nຂໍ້ມູນເພື່ອການສຶກສາເທົ່ານັ້ນ ບໍ່ແມ່ນຄຳແນະນຳໃນການເສ່ຍໂຊກ.',
      th: 'สรุปผลหวยลาวประจำสัปดาห์:\n\n- หวยลาวการเงิน: รางวัลที่ 1 งวดล่าสุด 482701, ก่อนหน้า 156430\n- หวยลาวเวียงจันทน์: รางวัลที่ 1 งวดล่าสุด 305928, ก่อนหน้า 892017\n- หวยลาวปากเซ: รางวัลที่ 1 งวดล่าสุด 671284, ก่อนหน้า 740583\n\nสถิติเลขที่มาแรงในสัปดาห์นี้: 19, 28, 67\nเลขที่ไม่ออกใน 10 งวด: 04, 90\n\nข้อมูลเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำในการเสี่ยงโชค.',
    },
    author: 'ກອງບັນນາທິການ',
    publishedAt: daysFromNow(-1),
    readMinutes: 4,
    tags: ['recap', 'weekly'],
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'c-001',
    userName: 'ທີມຜູ້ດູແລ',
    message: 'ສະບາຍດີທຸກທ່ານ ຍິນດີຕ້ອນຮັບສູ່ການຖ່າຍທອດສົດປະຈຳມື້ນີ້ ກະລຸນາສະແດງຄຳຄິດເຫັນດ້ວຍຄວາມສຸພາບ',
    postedAt: new Date(Date.now() - 60_000 * 3).toISOString(),
    isAdmin: true,
    isPinned: true,
  },
  {
    id: 'c-002',
    userName: 'ສົມຈັນ',
    message: 'ມາລໍຖ້າແລ້ວ',
    postedAt: new Date(Date.now() - 60_000 * 2).toISOString(),
  },
  {
    id: 'c-003',
    userName: 'ບຸນຍັງ',
    message: 'ໂຊກດີທຸກຄົນ',
    postedAt: new Date(Date.now() - 60_000 * 1).toISOString(),
  },
  {
    id: 'c-004',
    userName: 'ນ້ອຍ',
    message: 'ສຽງຊັດດີຫຼາຍມື້ນີ້',
    postedAt: new Date(Date.now() - 30_000).toISOString(),
  },
];

export const numberStats: NumberStat[] = [
  { number: '67', frequency: 18, lastSeenDrawsAgo: 1, rank: 1 },
  { number: '19', frequency: 16, lastSeenDrawsAgo: 0, rank: 2 },
  { number: '28', frequency: 15, lastSeenDrawsAgo: 2, rank: 3 },
  { number: '94', frequency: 14, lastSeenDrawsAgo: 0, rank: 4 },
  { number: '57', frequency: 13, lastSeenDrawsAgo: 2, rank: 5 },
  { number: '38', frequency: 12, lastSeenDrawsAgo: 1, rank: 6 },
  { number: '01', frequency: 11, lastSeenDrawsAgo: 5, rank: 7 },
  { number: '76', frequency: 10, lastSeenDrawsAgo: 4, rank: 8 },
];

export function getResultsByType(type: string) {
  return recentResults.filter((r) => r.drawType === type);
}

export function getLotteryType(slug: string) {
  return lotteryTypes.find((t) => t.slug === slug);
}

export function getLatestLiveStream() {
  return upcomingStreams.find((s) => s.status === 'live');
}

export function getNextDraw(): { type: string; at: string } | null {
  const next = upcomingStreams.find((s) => s.status === 'scheduled' || s.status === 'live');
  return next ? { type: next.drawType, at: next.scheduledAt } : null;
}
