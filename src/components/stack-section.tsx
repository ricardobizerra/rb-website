import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { data, languages } from '@/data';
import { Icons } from './icons';

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
      <div className="grid grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-none">
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
      <CardContent className="p-6">
        <h3 className="text-foreground mb-4 text-center text-lg font-bold">
          {data.skills[variant].title}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {data.skills[variant].languages.map((skillId) => {
            const SkillIcon = Icons[skillId as keyof typeof Icons];

            return (
              <Badge
                key={`${variant}-${skillId}`}
                variant="outline"
                className="flex w-[calc(50%-4px)] items-center px-2 py-1 transition-all duration-300 hover:scale-105"
              >
                <SkillIcon width={16} height={16} />

                <p className="text-foreground text-xs font-medium">
                  {languages[skillId as keyof typeof languages]}
                </p>
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
