import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The live homepage's own title and description. Private demo: never indexed, never followed.
export const metadata: Metadata = {
  title: "Vysus Group: a leading engineering and technical consultancy",
  description: "We help our clients to optimise project development and asset performance. Solving challenges, managing risk and maximising returns.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#005454" };

/* Runs before first paint. Unless reduced motion is requested it adds `js` (so reveal targets can start hidden
   without a flash) and, on the first visit of the tab session, `is-loading` for the preloader. Without JavaScript
   nothing is hidden and the preloader never shows (see the <noscript> style too). */
const boot = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';return}d.classList.add('js');var s=null;try{s=sessionStorage.getItem('vysus-intro')}catch(e){}if(s!=='1')d.classList.add('is-loading')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/suisse-intl-light.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/suisse-intl-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero-poster.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
