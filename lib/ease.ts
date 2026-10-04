import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/* One easing family for the whole page, defined once as CSS variables in app/globals.css (so CSS transitions and
   GSAP tweens share the exact curves) and read from there into GSAP CustomEases on first use.
     out    power3.out   reckoner.com's reveals: 0.85s, y 0.25rem / 1.5em (main.js, front_page.js)
     soft   power1.out   reckoner.com's bar fade-in (1.25s) and nav sibling dim (0.5s)
     sway   power1.inOut reckoner.com's bar bob (4s, yoyo)
     menu   power2.out   reckoner.com's menu timeline ("cubic.out", 0.5s / 0.25s) */
const VARS = { out: "--ease-out", soft: "--ease-soft", sway: "--ease-sway", menu: "--ease-menu" } as const;
// Fallbacks match globals.css, for the first frame on the server or before styles apply.
const FALLBACK = { out: "0.25,1,0.5,1", soft: "0.5,1,0.89,1", sway: "0.45,0,0.55,1", menu: "0.33,1,0.68,1" } as const;
const made = new Set<string>();

export type EaseName = keyof typeof VARS;

export function ease(name: EaseName): string {
  const id = `vysus-${name}`;
  if (made.has(id) || typeof window === "undefined") return id;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(VARS[name]);
  const nums = (raw.match(/-?[\d.]+/g) ?? FALLBACK[name].split(",")).map(Number);
  const [x1, y1, x2, y2] = nums.length === 4 ? nums : FALLBACK[name].split(",").map(Number);
  CustomEase.create(id, `M0,0 C${x1},${y1} ${x2},${y2} 1,1`);
  made.add(id);
  return id;
}

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero, header and scroll wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}
