"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Icon, Label } from "@/components/ui";
import { careers } from "@/lib/content";
import { reducedMotion } from "@/lib/ease";

/* Careers as the page's visual call to action: one large panel playing the careers site's own brand film (Malmo
   chevrons sweeping in Oslo Neon), the copy set on its dark left half. The panel grows from 92% to full size as it
   travels up the screen (data-grow, scrubbed), the "grow" panel from the approved Voltwise build. The film is muted,
   loops, pauses off screen and under reduced motion, and has its own pause control. */
export function Careers() {
  const panel = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = panel.current, v = video.current; if (!el || !v) return;
    v.muted = true; // React does not render the muted attribute on the server
    if (reducedMotion()) userPaused.current = true;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) v.pause();
      else if (!userPaused.current) v.play().catch(() => {});
    }, { threshold: 0.15 });
    io.observe(el);
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync); v.addEventListener("pause", sync);
    return () => { io.disconnect(); v.removeEventListener("play", sync); v.removeEventListener("pause", sync); };
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <section className="careers section" id="careers" data-scene="light" aria-labelledby="careers-title" tabIndex={-1} data-late>
      <div className="wrap">
        <div className="careers-panel" ref={panel} data-grow data-scene="dark">
          <video ref={video} className="careers-film" muted loop playsInline preload="metadata" poster={careers.film.poster} aria-hidden="true" tabIndex={-1}>
            <source src={careers.film.mp4} type="video/mp4" />
          </video>
          <div className="careers-shade" aria-hidden="true" />
          <div className="careers-body">
            <Label>{careers.label}</Label>
            <h2 id="careers-title" className="careers-title" data-reveal="head">{careers.title}</h2>
            <div className="careers-facts" data-reveal="label">
              <p className="careers-stat"><span>{careers.stat.value}{careers.stat.suffix}</span> {careers.stat.label}</p>
              <ul className="careers-values" aria-label="Our values">{careers.values.map((v) => <li key={v}>{v}</li>)}</ul>
            </div>
            <div className="careers-actions" data-reveal="label">
              <Button href={careers.actions[0].href} tone="solid">{careers.actions[0].label}</Button>
              <Button href={careers.actions[1].href} tone="glass">{careers.actions[1].label}</Button>
            </div>
          </div>
          <button type="button" className="btn btn-glass careers-pause" onClick={toggle} aria-label={playing ? "Pause the careers film" : "Play the careers film"}>
            <Icon name={playing ? "pause" : "play"} />
          </button>
        </div>
      </div>
    </section>
  );
}
