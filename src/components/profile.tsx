import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';
import { cn } from '@/lib/utils';

export function ProfileHero() {
  return (
    <div className="flex flex-col items-center gap-4 pt-8 sm:pt-12 md:pt-16">
      <ProfileImage size="large" />

      <div className="text-center">
        <ProfileName type="hero" />
        <ProfileDescription />
      </div>
    </div>
  );
}

export function ProfileHeader({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={cn("flex items-center gap-2 transition-all duration-300 ease-in-out", isVisible ? "opacity-100" : "opacity-0 max-w-0 overflow-hidden whitespace-nowrap")}>
      <ProfileImage size="small" />

      <div className="text-center">
        <ProfileName type="header" />
        <ProfileDescription />
      </div>
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
        className="rounded-2xl"
        priority
      />
    </div>
  );
}

function ProfileName({ type }: { type: 'header' | 'hero' }) {
  return (
    <h1 className={cn("font-bold", {"text-sm sm:text-lg": type === 'header', "text-foreground text-2xl text-balance md:text-3xl": type === 'hero'})}>
      {data.personal.name}
    </h1>
  );
}

function ProfileDescription() {
  return (
    <p className="text-muted-foreground text-xl">
      <span className="font-semibold">
        {data.personal.description.prefix}{' '}
      </span>
      <span>{data.personal.description.suffix}</span>
    </p>
  )
}
