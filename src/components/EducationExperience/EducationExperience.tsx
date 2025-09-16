import { Course as ICourse, Institution as IInstitution } from "@prisma/client";
import Image from "next/image";
import React from "react";

import prisma from "@/lib/prisma";
import getCourseType from "@/utils/courseType";
import months from "@/utils/months";

type CourseReturn = ({institution: IInstitution} & ICourse)

export const getCourses = async (): Promise<CourseReturn[] | undefined> => {
  const courses = await prisma?.course.findMany({
    include: {
      institution: true
    },
    orderBy: [
      { endMonth: "desc" },
      { endYear: "desc" },
    ]
  });

  return courses;
};

export default async function EducationExperience() {
  const courses = await getCourses();

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl phone:text-xl">
        Formação
      </h2>
      <div className="md:flex mdx:gap-[2%] phone:flex-col phone:gap-0">
        {
          courses?.map(course => {
            return (
              <EducationComponent
                key={course.id}
                course={course}
              />
            )
          })
        }
      </div>
    </div>
  )
}

function EducationComponent({ course }: { course: CourseReturn }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const courseProgress = (course: ICourse) => ((course.actualPeriod - 1) / course.totalPeriods);
  const progress = courseProgress(course) * 100;

  const {
    name: courseType,
    color: courseTypeColor
  } = getCourseType(course.type);

  return (
    <div
      key={course.id}
      className="flex border-white border pl-4 pr-4 pt-[6px] pb-[6px] mt-4 gap-4 items-center justify-start rounded-md w-fit hover:bg-white hover:ease-in-out hover:duration-300 group max-w-full phone:w-full md:flex-col md:gap-2 md:pt-3 md:pb-3 mdx:w-[49%]"
    >
      <Image
        src={`/education/${course.institution.slug}.svg`}
        alt={course.institution.name}
        className="w-6 md:w-10 group-hover:hidden"
        width={24}
        height={24}
      />

      <Image
        src={`/education/${course.institution.slug}-hover.svg`}
        alt={course.institution.name}
        className="w-6 md:w-10 hidden group-hover:block"
        width={24}
        height={24}
      />

      <div className="flex gap-2 items-center md:flex-col">
        <p className="font-medium md:text-center md:text-sm group-hover:text-blue-300">
          {course.name}
        </p>

        <div className="flex gap-2 items-center">
          <p className='font-normal text-black rounded-sm pl-[6px] pr-[6px] md:text-sm group-hover:border-2 group-hover:border-black' style={{ backgroundColor: courseTypeColor }}>
            {courseType}
          </p>
          {course.ead && (
            <span className="text-black font-medium bg-blue-50 rounded-sm pl-[6px] pr-[6px] md:text-sm group-hover:border-2 group-hover:border-black">
              EAD
            </span>
          )}
        </div>

        <p className="font-normal md:text-sm group-hover:text-blue-300">
          {months[course.startMonth - 1]} {course.startYear} - {
            currentYear > course.endYear
            ? `${months[course.endMonth - 1]} ${course.endYear}`
            : currentYear === course.endYear && currentMonth >= course.endMonth
              ? `${months[course.endMonth - 1]} ${course.endYear}`
              : 'Atual'
          }
        </p>
      </div>

      <div className="gap-2 mb-px">
        <p className="font-medium text-sm text-white group-hover:text-blue-300">{progress.toFixed(1).replace('.',',')}%</p>
        <div
          className="h-2 border border-white group-hover:border-blue-300"
        >
          <div
            style={{
              width: `${progress}%`
            
            }}
            className={`bg-white group-hover:bg-blue-300 h-full`}
          />
        </div>
      </div>
    </div>
  )
}