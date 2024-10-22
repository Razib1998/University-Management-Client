export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  result: string;
};

export type TCreateAcademicSemester = {
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};
export type TCreateAcademicDepartment = {
  name: string;
  academicFaculty: string;
};
export type TCreateAcademicFaculty = {
  academicFaculty: string;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  result: string;
};
