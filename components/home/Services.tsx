import { Icon, Label } from "@/components/ui";
import { services } from "@/lib/content";

/* Our Services: the live oil-rig photograph leads (clip-open, parallax) beside the seven live services. Each row is
   reckoner.com's .str_block: a 1px border, a 0.5s ease to a Mist ground on hover, and its square button turning from
   Oslo Neon to Malmo Green. */
export function Services() {
  return (
    <section className="services section" id="services" data-scene="light" aria-labelledby="services-title" tabIndex={-1}>
      <div className="wrap services-grid">
        <figure className="services-media frame" data-reveal="image">
          <img src={services.image.src} alt={services.image.alt} data-parallax loading="lazy" />
        </figure>
        <div className="services-body">
          <Label as="h2" id="services-title">{services.label}</Label>
          <ul className="services-list" data-reveal="cards">
            {services.items.map((s) => (
              <li key={s.label}>
                <a className="service" href={s.href} target="_blank" rel="noopener">
                  <span className="service-title">{s.label}</span>
                  <span className="service-go" aria-hidden="true"><Icon name="arrow" /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
