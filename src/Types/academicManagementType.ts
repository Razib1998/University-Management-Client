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

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: TAcademicSemester;
  isDeleted: boolean;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  profileImg: string;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  _id: string;
};
