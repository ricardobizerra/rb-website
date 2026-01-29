import {
  EducationExperienceCard,
  WorkExperienceCard,
} from '@/components/experience-card';
import { Profile } from '@/components/profile';
import { StackSection } from '@/components/stack-section';
import { ExperienceHistory } from '@/components/experience-history';
import { ProjectsSection } from '@/components/projects-section';

export default function Portfolio() {
  return (
    <div className="relative mx-auto max-w-4xl space-y-12 py-12 pb-20">
      <Profile isHeader={false} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WorkExperienceCard />
        <EducationExperienceCard />
      </div>

      <ProjectsSection />

      <StackSection />

      <ExperienceHistory />
    </div>
  );
}
