import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { News } from "@/components/home/News";
import { Services } from "@/components/home/Services";
import { Split } from "@/components/home/Split";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { Careers } from "@/components/home/Careers";
import { CaseStudies } from "@/components/home/CaseStudies";
import { subscribe } from "@/lib/content";

/* vysusgroup.com's homepage in a new skin, after reckoner.com (look and motion): a dark hero with the cursor-reactive
   bar field over the Vysus film, then light chapters with square buttons, plain uppercase labels, hairline rows and
   32px statements, and a dark close. Every item on the live homepage is here, in its live order, plus a careers call to action; the two news blocks
   share one row and the footer CTA joins the footer. Copy: lib/content.ts. Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <Preloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <CaseStudies />
        <WhoWeAre />
        <News />
        <Careers />
        <Split id="subscribe" {...subscribe} flip late />
      </main>
      <Footer />
    </>
  );
}
