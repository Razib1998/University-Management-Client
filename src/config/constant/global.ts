export const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicFacultyName = [
  "Department of Computer Science",
  "Department of Computer Physics",
  "Department of Computer Mathematics",
  "Department of Computer Literature",
  "Department of Computer Biology",
  "Department of Computer Economics",
];

export const academicFacultyOptions = academicFacultyName.map((item) => ({
  value: item,
  label: item,
}));

export const monthsOptions = monthsName.map((item) => ({
  value: item,
  label: item,
}));
