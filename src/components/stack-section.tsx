import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { data, languages } from '@/data';
import { Icons } from './icons';

export function StackSection() {
  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Habilidades
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Tecnologias e ferramentas que utilizo
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-flow-col md:grid-cols-none">
        {Object.keys(data.skills).map((variant) => (
          <StackCard
            key={variant}
            variant={variant as keyof typeof data.skills}
          />
        ))}
      </div>
    </section>
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
