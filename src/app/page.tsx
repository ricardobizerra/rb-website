import {
  EducationExperienceCard,
  WorkExperienceCard,
} from '@/components/experience-card';
import { ProfileHero } from '@/components/profile';
import { StackSection } from '@/components/stack-section';
import { ExperienceHistory } from '@/components/experience-history';
import { Projects } from '@/components/projects';

export default function Portfolio() {
  return (
    <div className="relative mx-auto max-w-5xl space-y-12 py-12 pb-20 px-4 sm:px-6">
      <ProfileHero />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WorkExperienceCard />
        <EducationExperienceCard />
      </div>

      <Projects />

      <StackSection />

      <ExperienceHistory />
    </div>
  );
}
