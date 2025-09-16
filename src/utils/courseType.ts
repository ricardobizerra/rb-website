import { $Enums } from '@prisma/client';

interface CourseType {
  enum: $Enums.CourseType;
  name: string;
  color: string;
}

export const coursesArray: CourseType[] = [
  {
    enum: $Enums.CourseType.GRADUATION,
    name: 'Graduação',
    color: '#2ecc71',
  },
  {
    enum: $Enums.CourseType.MASTER,
    name: 'Mestrado',
    color: '#ffcc00',
  },
  {
    enum: $Enums.CourseType.DOCTORATE,
    name: 'Doutorado',
    color: '#ff9900',
  },
];

export default function getCourseType(courseType: $Enums.CourseType) {
  const courseToReturn = coursesArray.find((type) => type.enum === courseType);

  if (!courseToReturn) throw new Error('Invalid course type');
  return courseToReturn;
}
