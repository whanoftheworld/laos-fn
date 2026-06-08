import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/cn';
import { mockChatMessages } from '@/data/seed';
import type { ChatMessage } from '@/types';

const guestNames = ['ສົມຄິດ', 'ບຸນຍັງ', 'ນ້ອຍ', 'ແກ້ວ', 'ສຸພອນ', 'ດາວ', 'ມາລີ', 'ບຸນທະວີ', 'ສຸລິຍາ', 'ຄຳພອນ'];
const sampleLines = [
  'ໂຊກດີທຸກຄົນ',
  'ສຽງຊັດດີ',
  'ມາລໍຖ້າແລ້ວ',
  'ສະບາຍດີຈາກນະຄອນຫຼວງ',
  'ມື້ນີ້ສຽງດີຫຼາຍ',
  'ຫວັງວ່າຈະຖືກ',
  'ມາຮ່ວມລຸ້ນພ້ອມກັນ',
  'ສະບາຍດີຈາກປາກເຊ',
  'ຍິນດີຕ້ອນຮັບ',
  'ສະບາຍດີຈາກວຽງຈັນ',
];

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}ວິ`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} ນທ`;
  return `${Math.floor(mins / 60)} ຊມ`;
}

const AVATAR_COLORS = [
  'bg-brand-red',
  'bg-brand-blue',
  'bg-brand-green',
  'bg-brand-gold',
  'bg-info',
  'bg-warning',
];

function avatarColorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

const NEAR_BOTTOM_PX = 60;

export function LiveChat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [draft, setDraft] = useState('');
  const [unread, setUnread] = useState(0);
  const userName = useMemo(() => `Guest-${Math.floor(Math.random() * 9000) + 1000}`, []);
  const listRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  useEffect(() => {
    const tick = () => {
      const m: ChatMessage = {
        id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userName:
          guestNames[Math.floor(Math.random() * guestNames.length)] +
          Math.floor(Math.random() * 99),
        message: sampleLines[Math.floor(Math.random() * sampleLines.length)],
        postedAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev.slice(-99), m]);
    };
    const id = window.setInterval(tick, 4000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll only when user is at (or near) the bottom; otherwise count unread
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (atBottomRef.current) {
      el.scrollTop = el.scrollHeight;
      setUnread(0);
    } else {
      setUnread((c) => c + 1);
    }
  }, [messages.length]);

  function handleScroll() {
    const el = listRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    atBottomRef.current = distance < NEAR_BOTTOM_PX;
    if (atBottomRef.current && unread !== 0) setUnread(0);
  }

  function jumpToBottom() {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    atBottomRef.current = true;
    setUnread(0);
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    const m: ChatMessage = {
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      userName,
      message: text.slice(0, 200),
      postedAt: new Date().toISOString(),
    };
    atBottomRef.current = true;
    setMessages((prev) => [...prev.slice(-99), m]);
    setDraft('');
  }

  const pinned = messages.find((m) => m.isPinned);
  const others = messages.filter((m) => !m.isPinned);

  return (
    <div className="relative rounded-2xl bg-bg-elevated border border-border-subtle shadow-card flex flex-col h-full overflow-hidden">
      <header className="px-4 py-3 border-b border-border-subtle flex items-center justify-between gap-2 shrink-0">
        <h3 className="text-h3 text-text-primary flex items-center gap-2 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-live animate-pulse-live shrink-0" />
          <span className="truncate">{t('live.chat_title')}</span>
        </h3>
        <span className="text-caption text-text-tertiary shrink-0 inline-flex items-center gap-1">
          <i className="bi bi-people-fill" />
          {messages.length}
        </span>
      </header>

      {pinned && (
        <div className="px-4 py-3 bg-brand-gold-soft border-b border-border-subtle shrink-0">
          <div className="flex items-start gap-2.5">
            <i className="bi bi-pin-angle-fill text-brand-gold mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <span className="text-caption font-bold text-brand-gold">{pinned.userName}</span>
                {pinned.isAdmin && (
                  <span className="px-1.5 py-0.5 rounded bg-brand-red text-text-inverse text-[10px] font-bold">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-body-md text-text-primary leading-snug break-words">
                {pinned.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-3 space-y-3.5"
      >
        {others.length === 0 ? (
          <p className="text-center text-text-tertiary text-body-md py-10">
            {t('live.no_messages')}
          </p>
        ) : (
          others.map((m) => (
            <div key={m.id} className="flex items-start gap-2.5 animate-fade-in-up">
              <div
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full text-caption font-bold text-text-inverse shrink-0',
                  m.isAdmin ? 'bg-brand-red' : avatarColorFor(m.userName),
                )}
                title={m.userName}
              >
                {m.userName.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                  <span className="text-caption font-semibold text-text-primary truncate max-w-[60%]">
                    {m.userName}
                  </span>
                  {m.isAdmin && (
                    <span className="px-1.5 py-0.5 rounded bg-brand-red text-text-inverse text-[10px] font-bold">
                      Admin
                    </span>
                  )}
                  <span className="text-[10px] text-text-tertiary ml-auto shrink-0 tabular-nums">
                    {timeAgo(m.postedAt)}
                  </span>
                </div>
                <p className="text-body-md text-text-primary break-words leading-snug">
                  {m.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {unread > 0 && (
        <button
          onClick={jumpToBottom}
          className="absolute left-1/2 -translate-x-1/2 bottom-[88px] px-3 py-1.5 rounded-full bg-brand-red text-text-inverse text-caption font-bold shadow-result hover:bg-brand-red-hover transition animate-fade-in-up inline-flex items-center gap-1.5"
        >
          <i className="bi bi-arrow-down-circle-fill" />
          {unread} {t('live.new_messages')}
        </button>
      )}

      <div className="border-t border-border-subtle p-3 shrink-0">
        <p className="text-[10px] text-text-tertiary mb-2 px-1 leading-snug">
          {t('live.chat_rules')}
        </p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('live.chat_placeholder')}
            maxLength={200}
            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-bg-muted border border-transparent focus:border-brand-red focus:bg-bg-elevated outline-none text-body-md"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label={t('live.chat_send')}
            className="shrink-0 px-4 py-2 rounded-lg bg-brand-red text-text-inverse font-semibold disabled:opacity-40 hover:bg-brand-red-hover transition"
          >
            <i className="bi bi-send-fill" />
          </button>
        </form>
      </div>
    </div>
  );
}
