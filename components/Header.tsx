"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button, Icon } from "@/components/ui";
import { ease, onIntro, reducedMotion } from "@/lib/ease";
import { contact, nav, sections, services, site, socials } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu on Malmo Green: the live site's three mega menus (Sectors, Services, About) as columns, the rest
   of its navigation, the homepage sections and the socials. One GSAP timeline in, the same timeline reversed out,
   with reckoner.com's mobile-menu values: the panel fades in over 0.5s on "cubic.out" (power2.out) and the items rise
   0.5em into place, 0.25s each, spread across 0.25s. Focus is trapped inside, Esc closes, focus returns to the toggle. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const MENU = ease("menu");
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: MENU }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: "0.5em", opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: MENU, stagger: { amount: 0.25 } }, 0.15);
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    const lenis = getLenis();
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 100 : 1).play();
      lenis?.stop();
      const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a[href], button"));
      focusables()[0]?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { close(); return; }
        if (e.key !== "Tab") return;
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (t.progress() > 0) { lenis?.start(); t.timeScale(reducedMotion() ? 100 : 1.25).reverse(); }
  }, [open, close]);

  // Section links close the menu first, then the page scrolls (the link guard in Motion does the scrolling).
  const onClick = (e: React.MouseEvent) => { if ((e.target as Element).closest('a[href^="#"]')) close(); };
  const ext = { target: "_blank", rel: "noopener" } as const;

  return (
    <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" inert={!open} data-lenis-prevent onClick={onClick}>
      <div className="menu-inner wrap">
        <nav className="menu-cols" aria-label="Vysus Group">
          <div className="menu-col" data-menu-in>
            <a className="menu-head" href={nav.sectors.href} {...ext}>{nav.sectors.label}</a>
            {nav.sectors.groups.map((g) => (
              <div key={g.label} className="menu-group">
                {g.href ? <a className="menu-sub" href={g.href} {...ext}>{g.label}</a> : <p className="menu-sub">{g.label}</p>}
                <ul>{g.links.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="menu-col" data-menu-in>
            <a className="menu-head" href="#services">Services</a>
            <ul>{services.items.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
            <a className="menu-head menu-head-gap" href={nav.about.href} {...ext}>{nav.about.label}</a>
            <ul>{nav.about.links.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
          </div>
          <div className="menu-col" data-menu-in>
            <p className="menu-head">On this page</p>
            <ul>{sections.map((s) => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul>
            <p className="menu-head menu-head-gap">More</p>
            <ul>{nav.more.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
          </div>
        </nav>
        <div className="menu-foot" data-menu-in>
          <Button href={contact.action.href} tone="tint">{contact.action.label}</Button>
          <ul className="socials">
            {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...ext}><Icon name={s.icon} /></a></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* No bar and no box: the lock-up on the left; on the right the live primary links, the "Get in touch" button and the
   menu toggle. Hovering a link dims its siblings to 40% over 0.5s on power1.out (reckoner.com's .nav_links).
   The header's colour follows the scene behind it: a ticker reads which [data-scene] sits under the header and sets
   data-tone, and colours cross-fade with Reckoner's 0.5s ease. It hides on scroll down and returns on scroll up. */
export function Header() {
  const [open, setOpen] = useState(false);
  // In state, not classList: React rewrites className whenever `open` changes.
  const [entered, setEntered] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY, lastTone = "";
    const scenes = () => Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const tone = () => {
      const probe = el.offsetHeight / 2;
      const under = scenes().find((s) => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; });
      const t = under?.dataset.scene === "dark" ? "dark" : "light";
      if (t !== lastTone) { el.dataset.tone = t; lastTone = t; }
    };
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < 6) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    };
    gsap.ticker.add(tone);
    window.addEventListener("scroll", onScroll, { passive: true });
    const off = onIntro(() => setEntered(true));

    // Sibling dim (desktop only, as on Reckoner).
    const links = Array.from(el.querySelectorAll<HTMLElement>(".header-nav a"));
    const wide = window.matchMedia("(min-width: 993px)");
    const SOFT = ease("soft");
    const enter = (link: HTMLElement) => () => {
      if (!wide.matches || reducedMotion()) return;
      gsap.to(links, { opacity: 0.4, duration: 0.5, ease: SOFT });
      gsap.to(link, { opacity: 1, duration: 0.5, ease: SOFT });
    };
    const leave = () => gsap.to(links, { opacity: 1, duration: 0.5, ease: SOFT });
    const handlers = links.map((l) => { const h = enter(l); l.addEventListener("mouseenter", h); l.addEventListener("focus", h); l.addEventListener("mouseleave", leave); l.addEventListener("blur", leave); return h; });

    return () => {
      gsap.ticker.remove(tone);
      window.removeEventListener("scroll", onScroll);
      off();
      links.forEach((l, i) => { l.removeEventListener("mouseenter", handlers[i]); l.removeEventListener("focus", handlers[i]); l.removeEventListener("mouseleave", leave); l.removeEventListener("blur", leave); });
      gsap.killTweensOf(links);
    };
  }, []);

  useEffect(() => { if (open) bar.current?.classList.remove("is-hidden"); }, [open]);

  return (
    <>
      <header className={`site-header${entered ? " is-in" : ""}${open ? " is-open" : ""}`} ref={bar} data-tone="dark">
        <a href="#top" className="header-logo" aria-label="Vysus Group, back to the top"><Logo title="" /></a>
        <nav className="header-nav" aria-label="Main">
          <ul>{nav.quick.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>)}</ul>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={site.contact} target="_blank" rel="noopener">Get in touch</a>
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? close() : setOpen(true))}>
            <span className="menu-toggle-label">{open ? "Close" : "Menu"}</span>
            <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
