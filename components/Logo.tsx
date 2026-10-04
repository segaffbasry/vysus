import { LOGO_VIEWBOX, MARK_LEAF, MARK_STROKE, WORDMARK } from "@/lib/logo";

/* The real Vysus Group lock-up from the live sprite, as three parts the preloader can move separately:
   the mark's slanted stroke, the mark's half-leaf (both Oslo Neon, as on the live site) and the wordmark, which takes
   the current text colour (Malmo Green on light scenes, white on dark ones, set by the parent). */
export function Logo({ title = "Vysus Group", className }: { title?: string; className?: string }) {
  return (
    <svg className={`logo ${className ?? ""}`} viewBox={LOGO_VIEWBOX} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title || undefined} focusable="false">
      <path className="logo-stroke" data-part="stroke" d={MARK_STROKE} />
      <path className="logo-leaf" data-part="leaf" d={MARK_LEAF} />
      <path className="logo-word" data-part="word" d={WORDMARK} />
    </svg>
  );
}
