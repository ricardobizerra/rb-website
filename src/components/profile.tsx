import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';
import { cn } from '@/lib/utils';

export function Profile({ isHeader, isVisible }: { isHeader: boolean; isVisible?: boolean }) {
  return (
    <div className={isHeader ? cn("flex items-center gap-3 transition-all duration-300 ease-in-out", isVisible ? "opacity-100" : "opacity-0 max-w-0 overflow-hidden whitespace-nowrap") : "flex flex-col items-center gap-4 pt-16"} id={isHeader ? undefined : "profile-section"}>
      <div className="shrink-0">
        <Image
          src={RbPhoto}
          alt={`${data.personal.name} profile picture`}
          width={isHeader ? 32 : 64}
          height={isHeader ? 32 : 64}
          className={cn("border-primary/20 border-2", isHeader ? "rounded-lg" : "rounded-2xl")}
          priority
        />
      </div>

      <div className="text-center">
        <h1 className={cn("font-bold", isHeader ? "text-lg" : "text-foreground text-2xl text-balance md:text-3xl")}>
          {data.personal.name}
        </h1>
        {!isHeader && <p className="text-muted-foreground text-xl">
          <span className="font-semibold">
            {data.personal.description.prefix}{' '}
          </span>
          <span>{data.personal.description.suffix}</span>
        </p>}
      </div>
    </div>
  );
}
