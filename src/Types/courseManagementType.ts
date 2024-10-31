import { TAcademicSemester } from "./academicManagementType";

export type TRegisteredSemesters = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface PreRequisiteCourse {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
}

export type TCourseItem = {
  course: string;
  isDeleted: boolean;
};
