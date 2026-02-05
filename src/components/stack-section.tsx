import { Card, CardContent } from '@/components/ui/card';
import { data } from '@/data';
import { TechBadge } from './tech-badge';

import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from './section';

export function StackSection() {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Habilidades</SectionTitle>
        <SectionDescription>
          Tecnologias e ferramentas que utilizo
        </SectionDescription>
      </SectionHeader>
      <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-flow-col md:grid-cols-none">
        {Object.keys(data.skills).map((variant) => (
          <StackCard
            key={variant}
            variant={variant as keyof typeof data.skills}
          />
        ))}
      </div>
    </Section>
  );
}

function StackCard({ variant }: { variant: keyof typeof data.skills }) {
  return (
    <Card className="bg-card/80 border-primary/20 hover:bg-card transition-all duration-300">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-foreground mb-4 text-center text-base font-bold sm:text-lg">
          {data.skills[variant].title}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {data.skills[variant].languages.map((skillId) => (
            <TechBadge
              key={`${variant}-${skillId}`}
              skillId={skillId}
              iconSize={16}
              className="w-[calc(50%-4px)] hover:scale-105"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
