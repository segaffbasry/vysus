import { Button, Icon, Label } from "@/components/ui";
import { caseStudies } from "@/lib/content";

/* Case studies: the live homepage's banner becomes a showcase of the four most recent case studies. Statement and
   "Our case studies" sit on one row; below, four photo-led cards (photo, date and category, title, the live summary
   line). The photo eases in on hover and the arrow turns from Oslo Neon to Malmo Green, with Reckoner's 0.5s ease.
   On phones the row becomes a swipeable strip, so four cards do not stack into four screens. */
export function CaseStudies() {
  return (
    <section className="cases section" id="case-studies" data-scene="light" aria-labelledby="case-studies-title" tabIndex={-1}>
      <div className="wrap">
        <div className="cases-head">
          <div className="cases-intro">
            <Label>{caseStudies.label}</Label>
            <h2 id="case-studies-title" className="h-statement" data-reveal="head">{caseStudies.title}</h2>
          </div>
          <div data-reveal="label"><Button href={caseStudies.action.href}>{caseStudies.action.label}</Button></div>
        </div>
        <ul className="cases-grid" data-reveal="cards">
          {caseStudies.items.map((c) => (
            <li key={c.href}>
              <a className="case-card" href={c.href} target="_blank" rel="noopener">
                <span className="case-media"><img src={c.image} alt={c.alt} loading="lazy" /></span>
                <span className="case-meta"><time dateTime={c.iso}>{c.date}</time>{c.kicker && <span>{c.kicker}</span>}</span>
                <span className="case-title">{c.title}</span>
                <span className="case-text">{c.text}</span>
                <span className="case-go" aria-hidden="true"><Icon name="arrow" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
