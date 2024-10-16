import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  year: z.string({ required_error: "Year is Required" }),
  startMonth: z.string({ required_error: "Start Month is Required" }),
  endMonth: z.string({ required_error: "End Month is Required" }),
});
