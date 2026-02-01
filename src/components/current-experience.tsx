import { EducationExperienceCard, WorkExperienceCard } from './experience-card';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from './section';

export function CurrentExperience() {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Experiência atual</SectionTitle>
        <SectionDescription>
          Visão geral das minhas ocupações e estudos atuais
        </SectionDescription>
      </SectionHeader>

      <div className="xs:gap-4 grid grid-cols-2 gap-2 lg:gap-8">
        <WorkExperienceCard />
        <EducationExperienceCard />
      </div>
    </Section>
  );
}
