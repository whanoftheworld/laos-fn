import { useEffect, useRef, useState } from 'react';

const DEFAULT_BREAKPOINT = 1024;

export function useMatchedHeight<T extends HTMLElement = HTMLDivElement>(
  breakpoint = DEFAULT_BREAKPOINT,
) {
  const sourceRef = useRef<T>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = sourceRef.current;
    if (!el) return;

    const update = () => {
      if (window.innerWidth >= breakpoint) {
        setHeight(el.offsetHeight);
      } else {
        setHeight(null);
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [breakpoint]);

  return { sourceRef, height };
}
