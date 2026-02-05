import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';
import { cn } from '@/lib/utils';

export function ProfileHero() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 pt-6 sm:flex-row sm:gap-4 sm:pt-8 md:pt-10"
      id="profile-section"
    >
      <ProfileImage type="hero" />

      <div className="text-center sm:text-start">
        <ProfileName type="hero" />
        <ProfileDescription />
      </div>
    </div>
  );
}

export function ProfileHeader({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100'
          : 'max-h-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0',
      )}
    >
      <div className="xs:hidden block">
        <ProfileImage type="header" />
      </div>

      <div className="xs:block hidden">
        <ProfileName type="header" />
      </div>
    </div>
  );
}

function ProfileImage({ type }: { type: 'header' | 'hero' }) {
  return (
    <div className="shrink-0">
      <Image
        src={RbPhoto}
        alt={`${data.personal.name} profile picture`}
        className={cn('border-primary/20 border-2', {
          'size-8 rounded-md': type === 'header',
          'size-12 rounded-2xl sm:size-16': type === 'hero',
        })}
        priority
      />
    </div>
  );
}

function ProfileName({ type }: { type: 'header' | 'hero' }) {
  return (
    <h1
      className={cn('font-bold', {
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
    <p className={cn('text-muted-foreground text-base sm:text-xl', className)}>
      <span className="font-semibold">{data.personal.description.prefix} </span>
      <span>{data.personal.description.suffix}</span>
    </p>
  );
}
