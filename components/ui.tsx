import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

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

/* A small uppercase section label (reckoner.com's .brow type: 14px, uppercase, 0.02em). Plain text, no glyph:
   Malmo Green on light ground, Oslo Neon on dark. */
export function Label({ children, as: Tag = "p", id, reveal = true }: { children: ReactNode; as?: "p" | "h2" | "span"; id?: string; reveal?: boolean }) {
  return <Tag className="brow" id={id} {...(reveal ? { "data-reveal": "label" } : {})}>{children}</Tag>;
}
