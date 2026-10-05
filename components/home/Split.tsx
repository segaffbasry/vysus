import { Button, Label } from "@/components/ui";

/* The live site's "alternating content" block (label, statement, one button, one photograph) in Reckoner's type:
   a 32px statement with a 16px square label. Used for Subscribe, photograph first. */
export function Split({ id, label, title, action, image, flip = false, late = false }: {
  id: string; label: string; title: string; action: { label: string; href: string }; image: { src: string; alt: string }; flip?: boolean; late?: boolean;
}) {
  return (
    <section className={`split section${flip ? " is-flipped" : ""}`} id={id} data-scene="light" aria-labelledby={`${id}-title`} tabIndex={-1} {...(late ? { "data-late": "" } : {})}>
      <div className="wrap split-grid">
        <div className="split-body">
          <Label>{label}</Label>
          <h2 id={`${id}-title`} className="h-statement" data-reveal="head">{title}</h2>
          <div data-reveal="label"><Button href={action.href}>{action.label}</Button></div>
        </div>
        <figure className="split-media frame" data-reveal="image">
          <img src={image.src} alt={image.alt} data-parallax loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
