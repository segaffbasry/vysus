import { Button, Label } from "@/components/ui";
import { news } from "@/lib/content";

/* News and insights: the live homepage's Announcement and its two Featured articles in one row of reckoner.com's
   insight blocks (.ins_block: a 1px rule on the left, 14px gaps, date and category above a 22px title and a
   "Read" link whose underline retracts on hover). */
export function News() {
  return (
    <section className="news section" id="news" data-scene="light" aria-labelledby="news-title" tabIndex={-1} data-late>
      <div className="wrap">
        <div className="row-head">
          <Label as="h2" id="news-title">{news.label}</Label>
          <div data-reveal="label"><Button href={news.more.href}>{news.more.label}</Button></div>
        </div>
        <ul className="news-grid" data-reveal="cards">
          {news.items.map((n) => (
            <li key={n.href}>
              <a className="news-card" href={n.href} target="_blank" rel="noopener">
                <span className={`news-media${n.portrait ? " is-portrait" : ""}`}><img src={n.image} alt={n.alt} loading="lazy" /></span>
                <span className="news-meta"><time dateTime={n.iso}>{n.date}</time><span>{n.kicker}</span></span>
                <span className="news-title">{n.title}</span>
                <span className="news-more">Read article<span className="sr-only">: {n.title}</span><i className="link-line" aria-hidden="true" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
