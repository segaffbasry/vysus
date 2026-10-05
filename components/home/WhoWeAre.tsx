import { Icon, Label } from "@/components/ui";
import { whoWeAre } from "@/lib/content";

/* Who we are, on Malmo Green, as an editorial split: the label, the live statement and its four links as a clean
   list of hairline rows on the left; a still from the Vysus film on the right (clip-open, parallax). Hovering a row
   slides its label and arrow and brightens the arrow to Oslo Neon. No tiles, no icons. */
export function WhoWeAre() {
  return (
    <section className="who section" id="who-we-are" data-scene="dark" aria-labelledby="who-title" tabIndex={-1}>
      <div className="wrap who-grid">
        <div className="who-body">
          <Label>{whoWeAre.label}</Label>
          <h2 id="who-title" className="h-statement" data-reveal="head">{whoWeAre.title}</h2>
          <ul className="who-links" data-reveal="cards">
            {whoWeAre.links.map((l) => (
              <li key={l.label}>
                <a className="who-link" href={l.href} target="_blank" rel="noopener">
                  <span>{l.label}</span>
                  <Icon name="arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <figure className="who-media frame" data-reveal="image">
          <img src={whoWeAre.image.src} alt={whoWeAre.image.alt} data-parallax loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
