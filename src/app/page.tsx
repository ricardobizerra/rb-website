import { ProfileHero } from '@/components/profile';
import { StackSection } from '@/components/stack-section';
import { ExperienceHistory } from '@/components/experience-history';
import { Projects } from '@/components/projects';
import { CurrentExperience } from '@/components/current-experience';

export default function Portfolio() {
  return (
    <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 pb-20 sm:gap-10 sm:px-6 md:gap-12">
      <ProfileHero />

      <CurrentExperience />

      <Projects />

      <StackSection />

      <ExperienceHistory />
    </div>
  );
}
