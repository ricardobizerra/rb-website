import Image from 'next/image';
import { data } from '@/data';
import RbPhoto from '@/assets/rblf-photo.png';

export function Profile() {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
      <div className="flex-shrink-0">
        <Image
          src={RbPhoto}
          alt={`${data.personal.name} profile picture`}
          width={64}
          height={64}
          className="border-primary/20 rounded-2xl border-2"
          priority
        />
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-foreground text-2xl font-bold text-balance md:text-3xl">
          {data.personal.name}
        </h1>
        <p className="text-muted-foreground text-xl">
          <span className="font-semibold">
            {data.personal.description.prefix}{' '}
          </span>
          <span>{data.personal.description.suffix}</span>
        </p>
      </div>
    </div>
  );
}
