'use client';
import { useEffect } from 'react';
export default function RetargetJoin() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('a,button'));
    const match = (t:string) => /join/i.test(t) || /\$?1/.test(t);
    nodes.forEach(n => {
      const text = (n as HTMLElement).innerText?.trim() || '';
      if (match(text)) {
        if (n instanceof HTMLAnchorElement) n.href = '/join';
        if (n instanceof HTMLButtonElement) n.onclick = () => { window.location.href = '/join'; };
      }
    });
  }, []);
  return null;
}
