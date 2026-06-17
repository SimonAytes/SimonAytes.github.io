import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { Experience } from '@/components/sections/experience';
import { SelectedWork } from '@/components/sections/selected-work';
import { Skills } from '@/components/sections/skills';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { personJsonLd } from '@/lib/seo';

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <Hero />
      <Intro />
      <Experience />
      <SelectedWork />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
