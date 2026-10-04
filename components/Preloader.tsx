"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { ease, INTRO_DONE, reducedMotion } from "@/lib/ease";
import { getLenis } from "@/lib/scroll";

/* The company signing its name, built from the logo's own vector parts on the hero's opening colour (Malmo Green).
   The Vysus mark is two shapes, a slanted stroke and a half-leaf, so it is assembled the way it reads: the stroke
   rises into place, the leaf grows out from its flat edge beside it, then the wordmark is wiped on left to right.
   After a short hold the lock-up glides into the header logo position while the curtain fades onto the hero, whose
   own entrance starts at that moment. One timeline, 1.8s:
     0.10 to 0.55  stroke rises (y 40%, scaleY 0.6 from its foot)
     0.30 to 0.75  leaf grows from its flat edge (scale 0 to 1, origin right centre)
     0.55 to 1.15  wordmark clip-wipe
     1.15 to 1.30  hold
     1.30 to 1.80  exit: lock-up to the header logo, curtain fades; handover fires at 1.30
   Once per tab session (sessionStorage "vysus-intro"); skipped with reduced motion; hidden without JavaScript. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      try { sessionStorage.setItem("vysus-intro", "1"); } catch {}
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const mark = el.querySelector<HTMLElement>(".preloader-mark")!;
    const part = (s: string) => el.querySelector(`[data-part="${s}"]`);
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const flight = () => {
      if (!target) return { x: 0, y: -40, scale: 0.4 };
      const a = mark.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };
    const OUT = ease("out"), SWAY = ease("sway");

    // Set origins before scaling (setting them inside a scaling tween shifts SVG paths).
    gsap.set(part("stroke"), { transformOrigin: "50% 100%", smoothOrigin: false });
    gsap.set(part("leaf"), { transformOrigin: "100% 50%", smoothOrigin: false });

    const tl = gsap.timeline({ onComplete: () => { el.classList.remove("is-active"); el.style.display = "none"; html.classList.add("logo-landed"); } });
    tl.add(() => el.classList.add("is-active"), 0)
      .fromTo(part("stroke"), { yPercent: 40, scaleY: 0.6, autoAlpha: 0 }, { yPercent: 0, scaleY: 1, autoAlpha: 1, duration: 0.45, ease: OUT }, 0.1)
      .fromTo(part("leaf"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: OUT }, 0.3)
      .fromTo(part("word"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: SWAY }, 0.55)
      .add(handover, 1.3)
      // Measured when the exit starts (tweens initialise lazily), so late layout shifts are accounted for.
      .to(mark, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.5, ease: SWAY }, 1.3)
      .to(el.querySelector(".preloader-curtain"), { autoAlpha: 0, duration: 0.5, ease: "none" }, 1.3);

    // Never hold the page for long: if the tab was hidden or throttled, finish anyway.
    const failsafe = window.setTimeout(() => { tl.progress(1); }, 2600);
    return () => { window.clearTimeout(failsafe); tl.kill(); html.classList.remove("is-loading"); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain" />
      <div className="preloader-mark"><Logo title="" /></div>
    </div>
  );
}
