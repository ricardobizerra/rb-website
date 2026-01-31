import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export function ProfileHero() {
  return (
    <div className="flex flex-col items-center gap-4 pt-8 sm:pt-12 md:pt-16">
      <ProfileImage size="large" />

      <div>
        <ProfileName type="hero" />
        <ProfileDescription />
      </div>
    </div>
  );
}

export function ProfileHeader({ isVisible }: { isVisible: boolean }) {
  const isMobile = useIsMobile(360);

  return (
    <div
      className={cn(
        'flex items-center gap-2 transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100'
          : 'max-h-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0',
      )}
    >
      {isMobile ? <ProfileImage size="small" /> : <ProfileName type="header" />}
    </div>
  );
}

function ProfileImage({ size }: { size: 'small' | 'large' }) {
  const imageSize = (() => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
    }
  })();

  return (
    <div className="shrink-0">
      <Image
        src={RbPhoto}
        alt={`${data.personal.name} profile picture`}
        width={imageSize}
        height={imageSize}
        className={cn(
          'border-primary/20 border-2',
          size === 'small' ? 'rounded-md' : 'rounded-2xl',
        )}
        priority
      />
    </div>
  );
}

function ProfileName({ type }: { type: 'header' | 'hero' }) {
  return (
    <h1
      className={cn('text-center font-bold', {
        'xs:text-lg text-base sm:text-xl': type === 'header',
        'text-foreground text-2xl text-balance md:text-3xl': type === 'hero',
      })}
    >
      {data.personal.name}
    </h1>
  );
}

function ProfileDescription({ className }: { className?: string }) {
  return (
    <p className={cn('text-muted-foreground text-center text-xl', className)}>
      <span className="font-semibold">{data.personal.description.prefix} </span>
      <span>{data.personal.description.suffix}</span>
    </p>
  );
}
