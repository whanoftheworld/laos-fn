export type LotteryTypeSlug = 'lao-finance' | 'lao-vientiane' | 'lao-pakse';

export interface PrizeTier {
  key: string;
  amountKip: number;
  count: number;
  digits?: number;
}

export interface LotteryType {
  slug: LotteryTypeSlug;
  nameLo: string;
  nameTh: string;
  nameEn: string;
  drawDays: number[];
  drawTimeLocal: string;
  digitCount: number;
  brandColor: string;
  description: { lo: string; th: string };
  prizeStructure: PrizeTier[];
}

export type ResultStatus = 'draft' | 'verified' | 'published';

export interface LotteryResult {
  id: string;
  drawType: LotteryTypeSlug;
  drawDate: string;
  prize1: string;
  prize2: string[];
  prize3: string[];
  prize4Count: number;
  prize5Count: number;
  side1: string[];
  front3: string[];
  top3: string[];
  bottom2: string;
  status: ResultStatus;
  source: string;
  publishedAt: string;
  verifiedBy?: string;
}

export interface StreamSchedule {
  id: string;
  drawType: LotteryTypeSlug;
  scheduledAt: string;
  streamUrl: string;
  fallbackUrl?: string;
  status: 'scheduled' | 'live' | 'ended';
  viewerCount?: number;
  title: { lo: string; th: string };
}

export type NewsCategory =
  | 'announcements'
  | 'results_recap'
  | 'winner_stories'
  | 'regulatory'
  | 'system_notices'
  | 'anti_fraud'
  | 'responsible_play';

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  thumbnail: string;
  title: { lo: string; th: string };
  excerpt: { lo: string; th: string };
  body: { lo: string; th: string };
  author: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  userName: string;
  message: string;
  postedAt: string;
  isAdmin?: boolean;
  isPinned?: boolean;
}

export interface NumberStat {
  number: string;
  frequency: number;
  lastSeenDrawsAgo: number;
  rank: number;
}
