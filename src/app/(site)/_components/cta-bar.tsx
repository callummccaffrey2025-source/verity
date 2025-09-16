"use client";
import { useEffect, useState } from "react";
export default function CtaBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 backdrop-blur p-3 flex items-center gap-3">
          <span className="font-medium">Ready to see Verity in action?</span>
          <a className="btn ml-auto" href="/join-waitlist">Join waitlist</a>
          <a className="btn" href="/product">See product</a>
        </div>
      </div>
    </div>
  );
}
