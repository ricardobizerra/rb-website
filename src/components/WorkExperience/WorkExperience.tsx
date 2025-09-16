import { Job as IJob, Company as ICompany } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

import prisma from '@/lib/prisma';
import months from '@/utils/months';

type JobReturn = { jobs: IJob[] } & ICompany;

export const getCompanies = async (): Promise<JobReturn[]> => {
  const companies = await prisma?.company.findMany({
    include: {
      jobs: true,
    },
  });

  return companies;
};

export default async function WorkExperience() {
  const companies = await getCompanies();

  return (
    <div className="mt-8">
      <h2 className="phone:text-xl text-2xl font-semibold">
        Experiência Profissional
      </h2>
      <div className="mdx:gap-[2%] phone:flex-col phone:gap-0 md:flex">
        {companies?.map((company) => {
          return <WorkComponent key={company.id} company={company} />;
        })}
      </div>
    </div>
  );
}

function WorkComponent({ company }: { company: JobReturn }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const sortedJobs = company.jobs.sort((a, b) => {
    if (a.startYear === b.startYear) {
      return b.startMonth - a.startMonth;
    }
    return b.startYear - a.startYear;
  });

  return (
    <div
      key={company.id}
      className="group phone:w-full mdx:w-[49%] mt-4 flex w-fit max-w-full items-center justify-start gap-4 rounded-md border border-white pt-[6px] pr-4 pb-[6px] pl-4 hover:bg-white hover:duration-300 hover:ease-in-out md:flex-col md:gap-2 md:pt-4 md:pb-3"
    >
      <Image
        src={`/work/${company.slug}.svg`}
        alt={company.name}
        className="w-6 group-hover:hidden md:w-10"
        width={24}
        height={24}
      />

      <Image
        src={`/work/${company.slug}-hover.svg`}
        alt={company.name}
        className="hidden w-6 group-hover:block md:w-10"
        width={24}
        height={24}
      />

      <div className="flex flex-col gap-2">
        {sortedJobs.map((job) => {
          return (
            <div key={job.id} className="flex gap-2 md:flex-col md:gap-0">
              <p className="font-medium group-hover:text-blue-300 md:text-center md:text-sm">
                {job.name}
              </p>
              <p className="font-normal group-hover:text-blue-300 md:text-center md:text-sm">
                {months[job.startMonth - 1]} {job.startYear} -{' '}
                {currentYear > job.endYear
                  ? `${months[job.endMonth - 1]} ${job.endYear}`
                  : currentYear === job.endYear && currentMonth >= job.endMonth
                    ? `${months[job.endMonth - 1]} ${job.endYear}`
                    : 'Atual'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
