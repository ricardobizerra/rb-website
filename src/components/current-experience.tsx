import { EducationExperienceCard, WorkExperienceCard } from './experience-card';

export function CurrentExperience() {
  return (
    <div className="xs:gap-4 grid grid-cols-2 gap-2 lg:gap-8">
      <WorkExperienceCard />
      <EducationExperienceCard />
    </div>
  );
}
