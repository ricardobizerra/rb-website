import { ProfileHero } from '@/components/profile';
import { StackSection } from '@/components/stack-section';
import { ExperienceHistory } from '@/components/experience-history';
import { Projects } from '@/components/projects';
import { CurrentExperience } from '@/components/current-experience';

export default function Portfolio() {
  return (
    <div className="relative mx-auto max-w-5xl space-y-12 px-4 py-12 pb-20 sm:px-6">
      <ProfileHero />

      <CurrentExperience />

      <Projects />

      <StackSection />

      <ExperienceHistory />
    </div>
  );
}
