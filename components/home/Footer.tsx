import { Logo } from "@/components/Logo";
import { Button, Icon } from "@/components/ui";
import { contact, footer, socials } from "@/lib/content";

/* The live footer CTA ("Send us a message") and footer, laid out as reckoner.com's footer: two halves split by a
   1px rule, the lock-up and small print on the left, the statement and its action on the right. On Malmo Green, as
   the live footer is. */
export function Footer() {
  const ext = { target: "_blank", rel: "noopener" } as const;
  return (
    <footer className="footer" data-scene="dark" data-late tabIndex={-1} id="contact">
      <div className="wrap footer-grid">
        <div className="footer-left">
          <a href="#top" className="footer-logo" aria-label="Vysus Group, back to the top"><Logo title="" /></a>
          <ul className="socials">
            {socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...ext}><Icon name={s.icon} /></a></li>)}
          </ul>
          <div className="footer-links">
            <ul>{footer.primary.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
            <ul>{footer.legal.map((l) => <li key={l.label}><a href={l.href} {...ext}>{l.label}</a></li>)}</ul>
          </div>
          <p className="footer-copy">{footer.copyright}</p>
        </div>
        <div className="footer-right">
          <h2 className="h-statement" data-reveal="head">{contact.title[0]}<br />{contact.title[1]}</h2>
          <p className="footer-text" data-reveal="text">{contact.text}</p>
          <div data-reveal="label"><Button href={contact.action.href} tone="tint">{contact.action.label}</Button></div>
        </div>
      </div>
    </footer>
  );
}
