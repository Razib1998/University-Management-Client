import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  year: z.string({ required_error: "Year is Required" }),
  startMonth: z.string({ required_error: "Start Month is Required" }),
  endMonth: z.string({ required_error: "End Month is Required" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Faculty Name is Required" }),
});
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Department Name is Required" }),
  academicFaculty: z.string({ required_error: "Academic Faculty is Required" }),
});
