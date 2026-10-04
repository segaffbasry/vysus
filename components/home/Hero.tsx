"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { BarField } from "@/components/BarField";
import { Button, Icon } from "@/components/ui";
import { hero } from "@/lib/content";
import { ease, onIntro, reducedMotion } from "@/lib/ease";
import { splitWords } from "@/lib/split";

/* reckoner.com's hero composition on Vysus's material: a full-height Malmo Green field, the bar field across it, the
   statement in the lower half and a frosted bar along the bottom (border-top white/15%, blur 0.25em) carrying the
   two stats from the live stats band, a scroll cue and two square buttons. Behind it all runs the live header film,
   in natural colour, under a Malmo Green gradient that keeps the type legible.
   Entrance on intro:done: the film fades up, the headline's words rise out of masks, the bottom bar follows and the
   figures count up. The film is muted, has a pause control, pauses off screen and under reduced motion. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = root.current, v = video.current; if (!el || !v) return;
    const reduced = reducedMotion();
    // React does not render the muted attribute on the server, so autoplay needs the property set before play().
    v.muted = true;
    if (!reduced && v.paused) v.play().catch(() => setPlaying(false));
    if (reduced) { v.pause(); userPaused.current = true; setPlaying(false); }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) v.pause();
      else if (!userPaused.current) v.play().catch(() => setPlaying(false));
    });
    io.observe(el);
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync); v.addEventListener("pause", sync);

    let tl: gsap.core.Timeline | null = null;
    const counters = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
    if (!reduced) {
      const OUT = ease("out");
      const words = splitWords(el.querySelector<HTMLElement>(".hero-title")!);
      const later = el.querySelectorAll<HTMLElement>("[data-hero-in]");
      gsap.set(words, { yPercent: 105 });
      gsap.set(later, { y: "1.5em", autoAlpha: 0 });
      gsap.set(el.querySelector(".hero-film"), { autoAlpha: 0 });
      counters.forEach((c) => { c.textContent = "0"; });
      const play = () => {
        tl = gsap.timeline()
          .to(el.querySelector(".hero-film"), { autoAlpha: 1, duration: 1.4, ease: ease("soft") }, 0)
          .to(words, { yPercent: 0, duration: 0.85, ease: OUT, stagger: 0.012 }, 0.1)
          .to(later, { y: 0, autoAlpha: 1, duration: 0.85, ease: OUT, stagger: 0.1 }, 0.45);
        counters.forEach((c) => {
          const box = { v: 0 }, to = Number(c.dataset.count);
          tl!.to(box, { v: to, duration: 1.4, ease: OUT, onUpdate: () => { c.textContent = String(Math.round(box.v)); } }, 0.6);
        });
      };
      const off = onIntro(play);
      return () => { off(); tl?.kill(); io.disconnect(); v.removeEventListener("play", sync); v.removeEventListener("pause", sync); };
    }
    return () => { io.disconnect(); v.removeEventListener("play", sync); v.removeEventListener("pause", sync); };
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <section className="hero" ref={root} data-scene="dark" aria-labelledby="hero-title">
      <div className="hero-film">
        <video ref={video} muted loop playsInline autoPlay preload="auto" poster={hero.film.poster} aria-hidden="true" tabIndex={-1}>
          <source src={hero.film.mp4Small} type="video/mp4" media="(max-width: 1280px)" />
          <source src={hero.film.mp4} type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <BarField className="hero-bars" />

      <div className="hero-content">
        <div className="hero-headline wrap">
          <h1 id="hero-title" className="hero-title">{hero.title}</h1>
          <p className="hero-side" data-hero-in>A leading engineering and technical consultancy</p>
        </div>
        <div className="hero-bottom">
          <div className="hero-bottom-grid wrap">
            <dl className="hero-stats">
              {hero.stats.map((s) => (
                <div key={s.suffix} className="hero-stat" data-hero-in>
                  <dt className="hero-stat-value"><span data-count={s.value}>{s.value}</span><span className="hero-stat-suffix">{s.suffix}</span></dt>
                  <dd className="hero-stat-text">{s.text}</dd>
                </div>
              ))}
            </dl>
            <a href="#services" className="hero-cue" aria-label="Scroll to our services" data-hero-in><Icon name="down" /></a>
            <div className="hero-actions" data-hero-in>
              <button type="button" className="btn btn-glass hero-pause" onClick={toggle} aria-label={playing ? "Pause the film" : "Play the film"}>
                <Icon name={playing ? "pause" : "play"} />
              </button>
              <Button href={hero.actions[0].href} tone="glass">{hero.actions[0].label}</Button>
              <Button href={hero.actions[1].href} tone="tint">{hero.actions[1].label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
