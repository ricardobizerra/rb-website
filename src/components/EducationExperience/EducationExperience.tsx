import { Course as ICourse, Institution as IInstitution } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

import prisma from '@/lib/prisma';
import getCourseType from '@/utils/courseType';
import months from '@/utils/months';

type CourseReturn = { institution: IInstitution } & ICourse;

export const getCourses = async (): Promise<CourseReturn[] | undefined> => {
  const courses = await prisma?.course.findMany({
    include: {
      institution: true,
    },
    orderBy: [{ endMonth: 'desc' }, { endYear: 'desc' }],
  });

  return courses;
};

export default async function EducationExperience() {
  const courses = await getCourses();

  return (
    <div className="mt-8">
      <h2 className="phone:text-xl text-2xl font-semibold">Formação</h2>
      <div className="mdx:gap-[2%] phone:flex-col phone:gap-0 md:flex">
        {courses?.map((course) => {
          return <EducationComponent key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
}

function EducationComponent({ course }: { course: CourseReturn }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const courseProgress = (course: ICourse) =>
    (course.actualPeriod - 1) / course.totalPeriods;
  const progress = courseProgress(course) * 100;

  const { name: courseType, color: courseTypeColor } = getCourseType(
    course.type,
  );

  return (
    <div
      key={course.id}
      className="group phone:w-full mdx:w-[49%] mt-4 flex w-fit max-w-full items-center justify-start gap-4 rounded-md border border-white pt-[6px] pr-4 pb-[6px] pl-4 hover:bg-white hover:duration-300 hover:ease-in-out md:flex-col md:gap-2 md:pt-3 md:pb-3"
    >
      <Image
        src={`/education/${course.institution.slug}.svg`}
        alt={course.institution.name}
        className="w-6 group-hover:hidden md:w-10"
        width={24}
        height={24}
      />

      <Image
        src={`/education/${course.institution.slug}-hover.svg`}
        alt={course.institution.name}
        className="hidden w-6 group-hover:block md:w-10"
        width={24}
        height={24}
      />

      <div className="flex items-center gap-2 md:flex-col">
        <p className="font-medium group-hover:text-blue-300 md:text-center md:text-sm">
          {course.name}
        </p>

        <div className="flex items-center gap-2">
          <p
            className="rounded-sm pr-[6px] pl-[6px] font-normal text-black group-hover:border-2 group-hover:border-black md:text-sm"
            style={{ backgroundColor: courseTypeColor }}
          >
            {courseType}
          </p>
          {course.ead && (
            <span className="rounded-sm bg-blue-50 pr-[6px] pl-[6px] font-medium text-black group-hover:border-2 group-hover:border-black md:text-sm">
              EAD
            </span>
          )}
        </div>

        <p className="font-normal group-hover:text-blue-300 md:text-sm">
          {months[course.startMonth - 1]} {course.startYear} -{' '}
          {currentYear > course.endYear
            ? `${months[course.endMonth - 1]} ${course.endYear}`
            : currentYear === course.endYear && currentMonth >= course.endMonth
              ? `${months[course.endMonth - 1]} ${course.endYear}`
              : 'Atual'}
        </p>
      </div>

      <div className="mb-px gap-2">
        <p className="text-sm font-medium text-white group-hover:text-blue-300">
          {progress.toFixed(1).replace('.', ',')}%
        </p>
        <div className="h-2 border border-white group-hover:border-blue-300">
          <div
            style={{
              width: `${progress}%`,
            }}
            className={`h-full bg-white group-hover:bg-blue-300`}
          />
        </div>
      </div>
    </div>
  );
}
