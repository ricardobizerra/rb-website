import { Job as IJob, Company as ICompany } from "@prisma/client";
import Image from "next/image";
import React from "react";

import prisma from "@/lib/prisma";
import months from "@/utils/months";

type JobReturn = ({jobs: IJob[]} & ICompany)

export const getCompanies = async (): Promise<JobReturn[]> => {
  const companies = await prisma?.company.findMany({
    include: {
      jobs: true
    },
  });

  return companies;
};

export default async function WorkExperience() {
  const companies = await getCompanies();

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl phone:text-xl">
        Experiência Profissional
      </h2>
      <div className="md:flex mdx:gap-[2%] phone:flex-col phone:gap-0">
        {
          companies?.map(company => {
            return (
              <WorkComponent
                key={company.id}
                company={company}
              />
            )
          })
        }
      </div>
    </div>
  )
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
      className="flex border-white border pl-4 pr-4 pt-[6px] pb-[6px] mt-4 gap-4 items-center justify-start rounded-md w-fit hover:bg-white hover:ease-in-out hover:duration-300 group max-w-full phone:w-full md:flex-col md:gap-2 md:pt-4 md:pb-3 mdx:w-[49%]"
    >
      <Image
        src={`/work/${company.slug}.svg`}
        alt={company.name}
        className="w-6 md:w-10 group-hover:hidden"
        width={24}
        height={24}
      />

      <Image
        src={`/work/${company.slug}-hover.svg`}
        alt={company.name}
        className="w-6 md:w-10 hidden group-hover:block"
        width={24}
        height={24}
      />

      <div className="flex flex-col gap-2">
        {
          sortedJobs.map(job => {
            return (
              <div
                key={job.id}
                className="flex gap-2 md:flex-col md:gap-0"
              >
                <p className="font-medium md:text-center md:text-sm group-hover:text-blue-300">
                  {job.name}
                </p>
                <p className="font-normal md:text-center md:text-sm group-hover:text-blue-300">
                  {months[job.startMonth - 1]} {job.startYear} - {
                    currentYear > job.endYear
                      ? `${months[job.endMonth - 1]} ${job.endYear}`
                      : currentYear === job.endYear && currentMonth >= job.endMonth
                        ? `${months[job.endMonth - 1]} ${job.endYear}`
                        : 'Atual'
                  }
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}