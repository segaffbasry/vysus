"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { BAR_VIEWBOX, barPaths } from "@/lib/bars";
import { ease, onIntro, reducedMotion } from "@/lib/ease";

/* The copied interaction: reckoner.com's hero bar field (front_page.js, read 4 Oct 2026), rebuilt one to one.
   - load: every bar fades from opacity 0 to 1 over 1.25s on power1.out, 0.01s apart (here it starts on intro:done)
   - cursor: each frame, every bar eases 10% of the way (lerp 0.1) toward a target scaleY of 1.05 at the cursor's x,
     falling off linearly to 1 at 200px away; its fill-opacity follows from 0.1 to 0.3. Bars scale about the SVG's
     centre (transform-box: view-box; transform-origin: center), so they stretch away from the middle of the field
   - drift: every column group bobs y -16 to 16 over 4s on power1.inOut, staggered across 6s, repeating as a yoyo
   - the cursor response is off at 992px and below, as on Reckoner (no hover on touch)
   Palette swap: Reckoner's Linen #F9F7F4 bars on Merlot become Oslo Neon #00E3A9 on Malmo Green.
   Reduced motion: the bars stand still at their resting opacity. */
const MAX_DISTANCE = 200;
const MAX_SCALE = 1.05;
const MIN_SCALE = 1;
const LERP = 0.1;
const OPACITY = [0.1, 0.3];

export function BarField({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const paths = useMemo(() => barPaths(), []);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const bars = Array.from(el.querySelectorAll<SVGPathElement>("path"));
    const groups = Array.from(el.querySelectorAll<SVGGElement>("svg > g"));
    if (reducedMotion()) { gsap.set(bars, { opacity: 1 }); return; }

    const mobile = window.matchMedia("(max-width: 992px)");
    const eased = bars.map(() => 1);
    const setScale = bars.map((p) => gsap.quickSetter(p, "scaleY"));
    const setOpacity = bars.map((p) => gsap.quickSetter(p, "fillOpacity"));
    let centers: number[] = [];
    const measure = () => { centers = bars.map((p) => { const r = p.getBoundingClientRect(); return r.left + r.width / 2; }); };
    let recalc = 0;
    const queue = () => { window.clearTimeout(recalc); recalc = window.setTimeout(measure, 100); };
    measure();

    let mouseX = window.innerWidth / 2;
    const onMove = (e: MouseEvent) => { if (!mobile.matches) mouseX = e.clientX; };

    // Only animate while the field is on screen (Reckoner runs its loop forever; this is the one saving).
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(el);

    const tick = () => {
      if (!visible) return;
      for (let i = 0; i < bars.length; i++) {
        const distance = Math.min(Math.abs(mouseX - centers[i]), MAX_DISTANCE);
        const target = MAX_SCALE - (distance / MAX_DISTANCE) * (MAX_SCALE - MIN_SCALE);
        eased[i] += (target - eased[i]) * LERP;
        setScale[i](eased[i]);
        const t = (eased[i] - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
        setOpacity[i](OPACITY[0] + t * (OPACITY[1] - OPACITY[0]));
      }
    };

    let fadeIn: gsap.core.Tween | null = null;
    let drift: gsap.core.Tween | null = null;
    const start = () => {
      fadeIn = gsap.to(bars, { opacity: 1, duration: 1.25, stagger: 0.01, ease: ease("soft") });
      drift = gsap.fromTo(groups, { y: -16 }, { y: 16, duration: 4, ease: ease("sway"), stagger: { amount: 6, repeat: -1, yoyo: true } });
    };
    const off = onIntro(start);

    gsap.ticker.add(tick);
    document.addEventListener("mousemove", onMove);
    window.addEventListener("resize", queue);
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      off(); fadeIn?.kill(); drift?.kill();
      gsap.ticker.remove(tick);
      io.disconnect();
      window.clearTimeout(recalc);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", queue);
      window.removeEventListener("scroll", queue);
    };
  }, []);

  return (
    <div className={`bar-field ${className ?? ""}`} ref={root} aria-hidden="true">
      <svg viewBox={`0 0 ${BAR_VIEWBOX.w} ${BAR_VIEWBOX.h}`} width="100%" height="100%" fill="none">
        {paths.map((d, i) => <g key={i}><path d={d} /></g>)}
      </svg>
    </div>
  );
}
