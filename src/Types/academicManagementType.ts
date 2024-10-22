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
export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export type TCreateStudent = {
  _id: string;
  academicDepartment: string;
  admissionSemester: string;
  bloodGroup: string;
  contactNo: string;
  dateOfBirth: string;
  email: string;
  emergencyContactNo: string;
  gender: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  fullName: string;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
  };
  permanentAddress: string;
  presentAddress: string;
  profileImg: string;
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  result: string;
};
