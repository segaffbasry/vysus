import { Icon, Label, SpriteIcon } from "@/components/ui";
import { whoWeAre } from "@/lib/content";
import type { SpriteName } from "@/lib/sprite";

// One of the live site's own line icons per destination.
const icons: SpriteName[] = ["leaf", "globe", "study", "insights"];

/* Who we are, on Malmo Green: reckoner.com's About section (centred square label, a 32px statement, then a row of
   blocks that rise 1.5em in turn) with the live statement and its four links. The blocks keep Reckoner's
   .ab_block proportions (30px padding, icon above a 22px title) and its 0.5s hover. */
export function WhoWeAre() {
  return (
    <section className="who section" id="who-we-are" data-scene="dark" aria-labelledby="who-title" tabIndex={-1}>
      <div className="wrap">
        <div className="who-head">
          <Label>{whoWeAre.label}</Label>
          <h2 id="who-title" className="h-statement" data-reveal="head">{whoWeAre.title}</h2>
        </div>
        <ul className="who-blocks" data-reveal="cards">
          {whoWeAre.links.map((l, i) => (
            <li key={l.label}>
              <a className="who-block" href={l.href} target="_blank" rel="noopener">
                <SpriteIcon name={icons[i]} className="who-icon" />
                <span className="who-title">{l.label}</span>
                <span className="who-go" aria-hidden="true"><Icon name="arrow" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
