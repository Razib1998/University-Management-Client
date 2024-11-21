import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import StudentData from "../pages/admin/academicManagement/StudentData";
import StudentDetails from "../pages/admin/academicManagement/StudentDetails";

import CreateSemesterRegistration from "../pages/admin/courseManagement/CreateSemesterRegistration";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import AllCourses from "../pages/admin/courseManagement/AllCourses";
import AllOfferedCourses from "../pages/admin/courseManagement/AllOfferedCourses";
import CreateOfferedCourse from "../pages/admin/courseManagement/CreateOfferedCourse";
import UpdateStudent from "../pages/admin/academicManagement/UpdateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "A. Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "All students",
        path: "students",
        element: <StudentData />,
      },
      {
        path: "students/:id",
        element: <StudentDetails />,
      },
      {
        path: "student/:id",
        element: <UpdateStudent />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "S. Registration",
        path: "create-semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "Registered S.",
        path: "all-semester",
        element: <RegisteredSemester />,
      },

      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <AllCourses />,
      },
      {
        name: "C. Offer Courses",
        path: "create-offer-courses",
        element: <CreateOfferedCourse />,
      },
      {
        name: "Offer Course",
        path: "offer-courses",
        element: <AllOfferedCourses />,
      },
    ],
  },
];

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );

// export const adminRoutes = adminPaths.reduce((acc: TRoutes[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

// Hard coded Way..

// export const adminPaths = [
//   {
//     path: "/admin/dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "/admin/create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "/admin/create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "/admin/create-student",
//     element: <CreateStudent />,
//   },
// ];
