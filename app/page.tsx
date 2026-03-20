import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Intro from '@/components/sections/Intro';
import Skill from '@/components/sections/Skill';
import Work from '@/components/sections/Work';

export default function Home() {
  return (
    <main>
      <Intro />
      <About />
      <Experience />
      <Work />
      <Skill />
      <Education />
      <Contact />
    </main>
  );
}
