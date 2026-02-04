import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { languages } from '@/data';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  skillId: keyof typeof languages;
  className?: string;
  iconSize?: number;
}

/**
 * A reusable badge component that displays a technology/skill with its icon and name.
 */
export function TechBadge({
  skillId,
  className,
  iconSize = 14,
}: TechBadgeProps) {
  const SkillIcon = Icons[skillId as keyof typeof Icons];
  const skillName = languages[skillId];

  if (!SkillIcon || !skillName) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex w-auto items-center gap-1.5 px-2 py-1 transition-all duration-300',
        className,
      )}
    >
      <SkillIcon width={iconSize} height={iconSize} />
      <p className="text-foreground text-[10px] font-medium sm:text-xs">
        {skillName}
      </p>
    </Badge>
  );
}
