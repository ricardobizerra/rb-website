import prisma from "@/lib/prisma";
import months from "@/utils/months";
import { Course as ICourse, Institution as IInstitution } from "@prisma/client";
import Image from "next/image";
import React from "react";

type CourseReturn = ({institution: IInstitution} & ICourse)

export const getCourses = async (): Promise<CourseReturn[] | undefined> => {
  const courses = await prisma?.course.findMany({
    include: {
      institution: true
    },
    orderBy: {
      endYear: "desc"
    }
  });

  return courses;
};

export default async function EducationExperience() {
  const courses = await getCourses();

  return (
    <div>
      <h2>
        Formação
      </h2>
      <div>
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

  return (
    <div
      key={course.id}
      className="flex border-white border pl-4 pr-4 pt-[6px] pb-[6px] gap-4 items-center justify-start rounded-md w-fit hover:bg-white hover:ease-in-out hover:duration-300 group max-w-full"
    >
      <Image
        src={`/education/${course.institution.slug}.svg`}
        alt={course.name}
        className="w-6 group-hover:hidden"
        width={24}
        height={24}
      />

      <Image
        src={`/education/${course.institution.slug}-hover.svg`}
        alt={course.name}
        className="w-6 hidden group-hover:block"
        width={24}
        height={24}
      />

      <div className="flex gap-2">
        <p className="font-medium group-hover:text-blue-300">
          {course.name}
        </p>
        {course.ead && (
          <span className="text-blue-50 font-medium group-hover:text-blue-200">
            EAD
          </span>
        )}
        <p className="font-normal group-hover:text-blue-300">
          {months[course.startMonth - 1]} {course.startYear} - {
            (course.endMonth >= currentMonth && course.endYear === currentYear)
              ? `${months[course.endMonth - 1]} ${course.endYear}`
              : 'Atual'
          }
        </p>
      </div>

      <div className="gap-2 mb-[1px]">
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