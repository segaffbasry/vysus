"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { ease, reducedMotion } from "@/lib/ease";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger);

/* Page-wide behaviour:
   - the link guard: this is a private demo, so links keep their live hrefs but never leave the page;
     "#" links scroll through Lenis instead
   - Lenis on the GSAP ticker, synced with ScrollTrigger, lagSmoothing(0), stopped while the preloader plays
     (reckoner.com's main.js: `new Lenis()` with its defaults, so the same here)
   - the reveal vocabulary, declared in markup with data-reveal (table in README.md). All moves use Reckoner's
     power3.out at 0.85s, play once, and run at 0.75 of the duration inside [data-late]:
       head   a heading: the whole phrase fades and rises 0.5em
       text   a paragraph: its words rise out of a mask, 0.006s apart
       label  labels and buttons: fade and rise 0.25rem (Reckoner's data-reveal="text")
       cards  a list: its children fade and rise 1.5em, 0.1s apart (Reckoner's .about_blocks)
       image  a frame that clips open from the bottom; an <img data-parallax> inside drifts ±5% (10% travel)
   Plus one scrubbed move, data-grow (from the approved Voltwise build): a large panel scales from 92% to full size
   while its top travels from the bottom of the screen to 30% down, so the box expands as you arrive at it. */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      // A link inside the menu fires while the menu still has Lenis stopped. start() resets any running scroll, so
      // it goes first and the menu's own start() on close becomes a no-op.
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.4 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      if (typeof target !== "number") target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    const lenis = new Lenis();
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const OUT = ease("out");
    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? 0.75 : 1);
      const once = (el: Element, start = "top 90%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        gsap.fromTo(el, { y: "0.5em", autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 * pace(el), ease: OUT, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 105 }, { yPercent: 0, duration: 0.85 * pace(el), ease: OUT, stagger: 0.006, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: "0.25rem", autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 * pace(el), ease: OUT, scrollTrigger: once(el, "top 95%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: "1.5em", autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 94%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.85 * pace(list), ease: OUT, stagger: 0.1 }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 * pace(el), ease: OUT, scrollTrigger: once(el, "top 92%") });
      });

      gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
        gsap.fromTo(el, { scale: 0.92 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "top 30%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
