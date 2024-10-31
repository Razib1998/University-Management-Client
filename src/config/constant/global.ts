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

export const genders = ["Male", "Female", "Other"];
export const status = ["UPCOMING", "ONGOING", "ENDED"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const statusOptions = status.map((item) => ({
  value: item,
  label: item.toLowerCase(),
}));
