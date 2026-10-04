import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";
import { sprite, type SpriteName } from "@/lib/sprite";

const glyphs = {
  arrow: <path d="M5 12h13M12.5 6.5 18 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  down: <path d="M12 5v13M6.5 12.5 12 18l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
};

export type IconName = keyof typeof glyphs | keyof typeof brandIcons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const brand = (brandIcons as Record<string, string>)[name];
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {brand ? <path d={brand} fill="currentColor" /> : glyphs[name as keyof typeof glyphs]}
    </svg>
  );
}

/* One of the live site's own line icons, from its SVG sprite. */
export function SpriteIcon({ name, className }: { name: SpriteName; className?: string }) {
  const s = sprite[name];
  return (
    <svg className={`sprite-icon ${className ?? ""}`} viewBox={s.viewBox} aria-hidden="true" focusable="false">
      {s.d.map((d) => <path key={d.slice(0, 24)} d={d} fill="currentColor" />)}
    </svg>
  );
}

/* reckoner.com's .btn: square, label 14px on line-height 1, padding 1.125em 1.5em 1em, and a 0.5s `ease` on
   background-color, border-color and color. Its tones, in the Vysus palette:
     glass  transparent with a 1px white/15% border on dark ground; fills white with Ink text on hover (.btn.transparent)
     tint   white/10% on dark ground; fills white on hover (.btn.o_10)
     solid  Oslo Neon with Ink text on light ground; turns Malmo Green with white text on hover (.btn.sand) */
export function Button({ href, children, tone = "solid", className, icon }: {
  href: string; children: ReactNode; tone?: "glass" | "tint" | "solid"; className?: string; icon?: IconName;
}) {
  const external = !href.startsWith("#");
  return (
    <a href={href} className={`btn btn-${tone} ${className ?? ""}`} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="btn-label">{children}</span>
      {icon && <Icon name={icon} />}
    </a>
  );
}

/* reckoner.com's .brow: a 16px square drawn as a soft inset glow (box-shadow 0 0 .25em .0625em) beside a 14px
   uppercase label. The square takes Oslo Neon on dark ground and Malmo Green on light. */
export function Label({ children, as: Tag = "p", id, reveal = true }: { children: ReactNode; as?: "p" | "h2" | "span"; id?: string; reveal?: boolean }) {
  return (
    <Tag className="brow" id={id} {...(reveal ? { "data-reveal": "label" } : {})}>
      <span className="brow-icon" aria-hidden="true" />
      <span className="brow-text">{children}</span>
    </Tag>
  );
}
