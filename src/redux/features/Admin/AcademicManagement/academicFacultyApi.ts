import {
  TAcademicDepartment,
  TAcademicFaculty,
} from "../../../../Types/academicManagementType";
import { TQueryParam, TResponseRedux } from "../../../../Types/global";
import { basApi } from "../../../api/baseApi";

const academicFacultyApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[TAcademicFaculty]>) => {
        return {
          data: response?.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-departments",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[TAcademicDepartment]>) => {
        return {
          data: response?.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
  useGetAllAcademicDepartmentQuery,
} = academicFacultyApi;
